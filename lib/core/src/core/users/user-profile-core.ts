import { UsersDb, UsersLogsDb } from '@db'
import { ChangePassModel, EmailModel, LogType, PictureModel, UserProfileModel, UserPublicProfileModel, UsersLogsTbl, UsersTbl, VerifyCodeModel } from '@dto'
import { EmailSender, ErrorApi500, ErrorsMsg, PasswordHash, VerificationCode } from '@shared'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'
import { PicturesCore } from '../pictures'

export class UserProfileCore extends Core {

    private usersDb = new UsersDb(this.pool)
    private usersLogsDb = new UsersLogsDb(this.pool)
    private picturesCore = new PicturesCore(this.env, this.logger, this.pool)

    /**
     * get user profile
     * @param userId
     */
    async getUserProfile(userId: string): Promise<UserProfileModel> {
        ParamValidation.validateUuId(userId)
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{user_id: '', nickname: '', email: '', avatar_id: ''},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
        return <UserProfileModel>{
            userId: UsersTbl.user_id,
            nickname: UsersTbl.nickname,
            email: UsersTbl.email,
            avatarId: UsersTbl.avatar_id
        }
    }

    /**
     * update user profile picture
     * @param userId
     * @param pictureModel
     */
    async updatePictureProfile(userId: string, pictureModel: PictureModel): Promise<string> {
        ParamValidation.validateUuId(userId)
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{avatar_id: ''},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
        pictureModel.pictureId = randomUUID()
        const picAdd = await this.picturesCore.add(pictureModel)
        const picUpd = await this.usersDb.update(
            <UsersTbl>{avatar_id: pictureModel.pictureId},
            <UsersTbl>{user_id: userId}
        )
        const picDel = await this.picturesCore.del(UsersTbl.avatar_id)
        if (!picAdd || !picUpd || !picDel) {
            throw new ErrorApi500(ErrorsMsg.UpdateProfilePicture)
        }
        return pictureModel.pictureId
    }

    /**
     * update user public profile
     * @param userId
     * @param userPublicProfileModel
     */
    async updatePublicProfile(userId: string, userPublicProfileModel: UserPublicProfileModel): Promise<number> {
        ParamValidation.validateUuId(userId)
        return this.usersDb.update(
            <UsersTbl>{nickname: userPublicProfileModel.nickname},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
    }

    /**
     * add new email
     * @param userId
     * @param emailModel
     */
    async modifyEmail(userId: string, emailModel: EmailModel) {
        ParamValidation.validateUuId(userId)
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{user_id: ''},
            <UsersTbl>{is_del: 0, email: emailModel.email}
        )
        if (UsersTbl) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
        const verification_code = VerificationCode.generate()
        await this.sendNewEmailVerificationCode(emailModel.email, verification_code)
        return this.usersDb.update(
            <UsersTbl>{new_email: emailModel.email, new_email_verification_code: verification_code},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
    }

    private sendNewEmailVerificationCode = async (to: string, verificationCode: string): Promise<void> => {
        const mailer = new EmailSender(this.env, this.logger)
        const result = await mailer.sendEmail(to, 'New email verification code!', `To confirm your new email enter this verification code - ${verificationCode}`)
        if (result === 0) {
            throw new ErrorApi500(ErrorsMsg.SendEmail)
        }
    }

    /**
     * verify code for new email
     * @param userId
     * @param verifyCodeModel
     * @param remoteAddress
     */
    async verifyNewEmail(userId: string, verifyCodeModel: VerifyCodeModel, remoteAddress: string) {
        ParamValidation.validateUuId(userId)
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{email: '', new_email_verification_code: '', new_email: ''},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
        if (!UsersTbl) {
            throw new ErrorApi500(ErrorsMsg.UserNotExist)
        }
        if (UsersTbl.new_email_verification_code !== verifyCodeModel.verificationCode) {
            throw new ErrorApi500(ErrorsMsg.VerificationCodeWrong)
        }
        await this.usersLogsDb.insert(<UsersLogsTbl>{
            user_id: userId,
            host_ip: remoteAddress,
            log_type_id: LogType.userChangeEmail,
            log_desc: `old email: ${UsersTbl.email}, new email: ${UsersTbl.new_email}`
        })
        return this.usersDb.update(
            <UsersTbl>{email: UsersTbl.new_email, new_email: null, new_email_verification_code: null},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
    }

    /**
     * verify code for new email
     * @param userId
     * @param changePassModel
     * @param remoteAddress
     */
    async changePassword(userId: string, changePassModel: ChangePassModel, remoteAddress: string) {
        ParamValidation.validateUuId(userId)
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{password_hash: '', password_salt: ''},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
        if (!UsersTbl) {
            throw new ErrorApi500(ErrorsMsg.UserNotExist)
        }
        const verifiedHash = PasswordHash.createSaltedHash(changePassModel.currentPass, UsersTbl.password_salt)
        // check current password
        if (verifiedHash.passwordHash !== UsersTbl.password_hash) {
            throw new ErrorApi500(ErrorsMsg.WrongCurrentPassword)
        }
        const saltedHash = PasswordHash.createSaltedHash(changePassModel.newPass)
        await this.usersLogsDb.insert(<UsersLogsTbl>{
            user_id: userId,
            host_ip: remoteAddress,
            log_type_id: LogType.userChangePass,
            log_desc: `old pass hash: ${UsersTbl.password_hash}, new pass hash: ${saltedHash.passwordHash}`
        })
        return this.usersDb.update(
            <UsersTbl>{password_hash: saltedHash.passwordHash, password_salt: saltedHash.passwordSalt},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
    }

}
