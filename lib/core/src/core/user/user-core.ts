import { AuthModel, AuthType, ForgotPassModel, LoginModel, ResetPassModel, UserSignupModel, UserTbl, VerifyCodeModel } from '@dto'
import { EmailSender, ErrorApi500, ErrorsMsg, PasswordHash, PictureDto, UserDto, ValueHelper, VerificationCode } from '@shared'
import jwt from 'jsonwebtoken'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

const {sign} = jwt

export class UserCore extends Core {

    public userDto = new UserDto()
    public pictureDto = new PictureDto()

    /**
     * signup user
     * @param model
     */
    async signup(model: UserSignupModel): Promise<void> {
        model = new UserSignupModel(model)
        ParamValidation.allFieldRequired(model)
        await this.isEmailExist(model.email)
        const pictureTbl = this.pictureDto.pictureTblFromModel(model.avatar)
        await this.pictureDb.insert(pictureTbl)
        const userTbl = this.userDto.userTblFromModel(model, pictureTbl.picture_id)
        await this.userDb.insert(userTbl)
        await this.sendVerificationCode(userTbl.email, userTbl.verification_code)
    }

    private isEmailExist = async (email: string): Promise<void> => {
        const result = await this.userDb.select(
            <UserTbl>{user_id: undefined},
            <UserTbl>{is_del: 0, email: email})
        if (!!result) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
    }

    private sendVerificationCode = async (to: string, verificationCode: string): Promise<boolean> => {
        const mailer = new EmailSender(this.env, this.logger)
        return mailer.sendEmail(to, 'Verification code!', `Your verification code is - ${verificationCode}`)
            .catch(() => false)
    }

    /**
     * login user
     * @param model
     */
    async login(model: LoginModel): Promise<AuthModel> {
        model = new LoginModel(model)
        ParamValidation.allFieldRequired(model)
        const userTbl: UserTbl = await this.getUserIfExist(model)
        const needConfirm: AuthModel = await this.checkIfNeedConfirmation(model, userTbl)
        if (needConfirm) return needConfirm
        return this.getTokenIfPassOk(model, userTbl)
    }

    private getUserIfExist = async (model: LoginModel): Promise<UserTbl> => {
        const userTbl = await this.userDb.select(
            <UserTbl>{
                user_id: '',
                email: '',
                nickname: '',
                avatar_id: '',
                password_hash: '',
                password_salt: '',
                is_verified: 0
            },
            <UserTbl>{email: model.email, is_del: 0}
        )
        if (ValueHelper.isEmpty(userTbl)) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        return userTbl
    }
    private checkIfNeedConfirmation = async (model: LoginModel, userTbl: UserTbl): Promise<AuthModel> => {
        // if not confirmed & update pre_confirmed_hash and ask for confirmation
        const verifiedHash = PasswordHash.createSaltedHash(model.password, userTbl.password_salt)
        if (userTbl.is_verified == 0) {
            await this.userDb.update(
                <UserTbl>{pre_verified_hash: verifiedHash.passwordHash},
                <UserTbl>{user_id: userTbl.user_id, is_del: 0})
            return <AuthModel>{userId: userTbl.user_id, email: userTbl.email, authType: AuthType.NeedVerification}
        } else {
            return undefined
        }
    }
    private getTokenIfPassOk = (model: LoginModel, userTbl: UserTbl): AuthModel => {
        const verifiedHash = PasswordHash.createSaltedHash(model.password, userTbl.password_salt)
        // if confirmed check password
        if (verifiedHash.passwordHash !== userTbl.password_hash) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        // create token by sign
        const token = sign({user_id: userTbl.user_id}, this.env.token_key, {expiresIn: '2h'})
        return <AuthModel>{
            userId: userTbl.user_id,
            email: userTbl.email,
            nickname: userTbl.nickname,
            avatarId: userTbl.avatar_id,
            token: token,
            authType: AuthType.Authenticated
        }
    }


    /**
     * confirm code
     * @param userId
     * @param verifyModel
     */
    async verifyCode(userId: string, verifyModel: VerifyCodeModel): Promise<AuthModel> {
        ParamValidation.validateUuId(userId)
        ParamValidation.validateVerificationCodeFormat(verifyModel.verificationCode)
        await this.verifyCodeInDb(userId, verifyModel.verificationCode)
        await this.markUserVerified(userId)
        return this.getTokenAfterVerification(userId)
    }

    private verifyCodeInDb = async (userId: string, verificationCode: string): Promise<void> => {
        const result = await this.userDb.select(
            <UserTbl>{user_id: ''},
            <UserTbl>{is_del: 0, user_id: userId, verification_code: verificationCode})
        if (ValueHelper.isEmpty(result)) {
            throw new ErrorApi500(ErrorsMsg.VerificationCodeWrong)
        }
    }
    private markUserVerified = async (userId: string) => {
        return this.userDb.update(
            <UserTbl>{is_verified: 1, verification_code: null},
            <UserTbl>{user_id: userId, is_del: 0}
        )
    }
    private getTokenAfterVerification = async (userId: string): Promise<AuthModel> => {
        // get previously login generated hash
        const userTbl = await this.userDb.select(
            <UserTbl>{nickname: '', avatar_id: '', pre_verified_hash: '', password_hash: ''},
            <UserTbl>{is_del: 0, user_id: userId}
        )
        // create token by sign if password verified
        if (userTbl.pre_verified_hash === userTbl.password_hash) {
            const token = sign({user_id: userId}, this.env.token_key, {expiresIn: '2h'})
            return <AuthModel>{
                userId: userId,
                email: userTbl.email,
                nickname: userTbl.nickname,
                avatarId: userTbl.avatar_id,
                token: token,
                authType: AuthType.Authenticated
            }
        } else {
            return <AuthModel>{
                userId: userId,
                email: userTbl.email,
                authType: AuthType.VerifiedButNotAuth
            }
        }
    }

    /**
     * resend verification code
     * @param userId
     */
    async resendCode(userId: string) {
        ParamValidation.validateUuId(userId)
        const userTbl = await this.userDb.select(
            <UserTbl>{email: ''},
            <UserTbl>{is_del: 0, user_id: userId})
        const verification_code = VerificationCode.generate()
        await this.userDb.update(
            <UserTbl>{verification_code: verification_code},
            <UserTbl>{user_id: userId, is_del: 0})
        return this.sendVerificationCode(userTbl.email, userTbl.verification_code)
    }

    /**
     * reset password
     * @param forgotPassModel
     */
    async forgotPass(forgotPassModel: ForgotPassModel) {
        ParamValidation.validateEmail(forgotPassModel.email)
        const userTbl = await this.userDb.select(
            <UserTbl>{user_id: ''},
            <UserTbl>{is_del: 0, email: forgotPassModel.email}
        )

        // send reset password link
        const mailer = new EmailSender(this.env, this.logger)
        return mailer.sendEmail(forgotPassModel.email, 'Reset password!', `Your verification code is - ${''}`)
            .catch(() => false)
    }

    /**
     * reset password
     * @param resetPassModel
     */
    async resetPass(resetPassModel: ResetPassModel) {
        ParamValidation.validateUuId(resetPassModel.userId)
        ParamValidation.validateUuId(resetPassModel.resetPassCode)
        const saltedHash = PasswordHash.createSaltedHash(resetPassModel.password)

        const userTbl = await this.userDb.update(
            <UserTbl>{password_hash: saltedHash.passwordHash},
            <UserTbl>{is_del: 0, user_id: resetPassModel.userId, reset_pass_code: resetPassModel.resetPassCode}
        )
        // send reset password link
    }

    /**
     * get user profile
     * @param userId
     */
    async getUserProfile(userId: string): Promise<UserTbl> {
        ParamValidation.validateUuId(userId)
        return this.userDb.select(
            <UserTbl>{user_id: '', nickname: '', avatar_id: '', email: ''},
            <UserTbl>{is_del: 0, user_id: userId}
        )
    }

}
