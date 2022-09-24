import { ChangePassModel, EmailModel, LogType, PictureModel, UserLogTbl, UserProfileModel, UserPublicProfileModel, UserTbl, VerifyCodeModel } from '@dto'
import { EmailSender, ErrorApi500, ErrorsMsg, PasswordHash, PictureDto, UserDto, VerificationCode } from '@shared'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'
import { PictureCore } from '../picture'

export class UserProfileCore extends Core {

    public userDto = new UserDto()
    public pictureDto = new PictureDto()
    private pictureCore = new PictureCore(this.env)

    /**
     * get user profile
     * @param userId
     */
    async getUserProfile(userId: string): Promise<UserProfileModel> {
        ParamValidation.validateUuId(userId)
        const userTbl = await this.userDb.select(
            <UserTbl>{user_id: '', nickname: '', email: '', avatar_id: ''},
            <UserTbl>{is_del: 0, user_id: userId}
        )
        return <UserProfileModel>{
            userId: userTbl.user_id,
            nickname: userTbl.nickname,
            email: userTbl.email,
            avatarId: userTbl.avatar_id
        }
    }

    /**
     * update user profile picture
     * @param userId
     * @param pictureModel
     */
    async updatePictureProfile(userId: string, pictureModel: PictureModel): Promise<string> {
        ParamValidation.validateUuId(userId)
        const userTbl = await this.userDb.select(
            <UserTbl>{avatar_id: ''},
            <UserTbl>{is_del: 0, user_id: userId}
        )
        pictureModel.pictureId = randomUUID()
        const picAdd = await this.pictureCore.add(pictureModel)
        const picUpd = await this.userDb.update(
            <UserTbl>{avatar_id: pictureModel.pictureId},
            <UserTbl>{user_id: userId}
        )
        const picDel = await this.pictureCore.del(userTbl.avatar_id)
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
        return this.userDb.update(
            <UserTbl>{nickname: userPublicProfileModel.nickname},
            <UserTbl>{is_del: 0, user_id: userId}
        )
    }

    /**
     * add new email
     * @param userId
     * @param emailModel
     */
    async modifyEmail(userId: string, emailModel: EmailModel) {
        ParamValidation.validateUuId(userId)
        const userTbl = await this.userDb.select(
            <UserTbl>{user_id: ''},
            <UserTbl>{is_del: 0, email: emailModel.email}
        )
        if (userTbl) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
        const verification_code = VerificationCode.generate()
        await this.sendNewEmailVerificationCode(emailModel.email, verification_code)
        return this.userDb.update(
            <UserTbl>{new_email: emailModel.email, new_email_verification_code: verification_code},
            <UserTbl>{is_del: 0, user_id: userId}
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
        const userTbl = await this.userDb.select(
            <UserTbl>{email: '', new_email_verification_code: '', new_email: ''},
            <UserTbl>{is_del: 0, user_id: userId}
        )
        if (!userTbl) {
            throw new ErrorApi500(ErrorsMsg.UserNotExist)
        }
        if (userTbl.new_email_verification_code !== verifyCodeModel.verificationCode) {
            throw new ErrorApi500(ErrorsMsg.VerificationCodeWrong)
        }
        await this.userLogDb.insert(<UserLogTbl>{
            user_id: userId,
            host_ip: remoteAddress,
            log_type_id: LogType.userChangeEmail,
            log_desc: `old email: ${userTbl.email}, new email: ${userTbl.new_email}`
        })
        return this.userDb.update(
            <UserTbl>{email: userTbl.new_email, new_email: null, new_email_verification_code: null},
            <UserTbl>{is_del: 0, user_id: userId}
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
        const userTbl = await this.userDb.select(
            <UserTbl>{password_hash: '', password_salt: ''},
            <UserTbl>{is_del: 0, user_id: userId}
        )
        if (!userTbl) {
            throw new ErrorApi500(ErrorsMsg.UserNotExist)
        }
        const verifiedHash = PasswordHash.createSaltedHash(changePassModel.currentPass, userTbl.password_salt)
        // check current password
        if (verifiedHash.passwordHash !== userTbl.password_hash) {
            throw new ErrorApi500(ErrorsMsg.WrongCurrentPassword)
        }
        const saltedHash = PasswordHash.createSaltedHash(changePassModel.newPass)
        await this.userLogDb.insert(<UserLogTbl>{
            user_id: userId,
            host_ip: remoteAddress,
            log_type_id: LogType.userChangePass,
            log_desc: `old pass hash: ${userTbl.password_hash}, new pass hash: ${saltedHash.passwordHash}`
        })
        return this.userDb.update(
            <UserTbl>{password_hash: saltedHash.passwordHash, password_salt: saltedHash.passwordSalt},
            <UserTbl>{is_del: 0, user_id: userId}
        )
    }

}
