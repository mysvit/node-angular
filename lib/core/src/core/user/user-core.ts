import { AuthModel, AuthType, DateDb, ForgotPassModel, ResetPassModel, SignInModel, UserSignupModel, UserTbl, VerifyCodeModel } from '@dto'
import { DateHelper, EmailSender, ErrorApi500, ErrorsMsg, PasswordHash, PictureDto, UserDto, ValueHelper, VerificationCode } from '@shared'
import { randomUUID } from 'crypto'
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
    async signup(model: UserSignupModel): Promise<number> {
        model = new UserSignupModel(model)
        ParamValidation.allFieldRequired(model)
        await this.isEmailExist(model.email)
        const pictureTbl = this.pictureDto.pictureTblFromModel(model.avatar)
        await this.pictureDb.insert(pictureTbl)
        const userTbl = this.userDto.userTblFromModel(model, pictureTbl.picture_id)
        await this.userDb.insert(userTbl)
        return this.sendVerificationCode(userTbl.email, userTbl.verification_code)
    }

    private isEmailExist = async (email: string): Promise<void> => {
        const result = await this.userDb.select(
            <UserTbl>{user_id: undefined},
            <UserTbl>{is_del: 0, email: email})
        if (!!result) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
    }

    private sendVerificationCode = async (to: string, verificationCode: string): Promise<number> => {
        const mailer = new EmailSender(this.env, this.logger)
        return mailer.sendEmail(to, 'Verification code!', `Your verification code is - ${verificationCode}`)
            .catch(() => 0)
    }

    /**
     * sign_in user
     * @param model
     */
    async signIn(model: SignInModel): Promise<AuthModel> {
        model = new SignInModel(model)
        ParamValidation.allFieldRequired(model)
        const userTbl: UserTbl = await this.getUserIfExist(model)
        const needConfirm: AuthModel = await this.checkIfNeedConfirmation(model, userTbl)
        if (needConfirm) return needConfirm
        return this.getTokenIfPassOk(model, userTbl)
    }

    private getUserIfExist = async (model: SignInModel): Promise<UserTbl> => {
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
    private checkIfNeedConfirmation = async (model: SignInModel, userTbl: UserTbl): Promise<AuthModel> => {
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
    private getTokenIfPassOk = async (model: SignInModel, userTbl: UserTbl): Promise<AuthModel> => {
        const verifiedHash = PasswordHash.createSaltedHash(model.password, userTbl.password_salt)
        // if confirmed check password
        if (verifiedHash.passwordHash !== userTbl.password_hash) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        await this.userDb.update(
            <UserTbl>{sign_in_date: new DateDb().value},
            <UserTbl>{user_id: userTbl.user_id, is_del: 0})
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
        // get previously sign_in generated hash
        const userTbl = await this.userDb.select(
            <UserTbl>{email: '', nickname: '', avatar_id: '', pre_verified_hash: '', password_hash: ''},
            <UserTbl>{is_del: 0, user_id: userId}
        )
        // create token by sign if password verified
        if (userTbl.pre_verified_hash === userTbl.password_hash) {
            await this.userDb.update(
                <UserTbl>{sign_in_date: new DateDb().value},
                <UserTbl>{user_id: userTbl.user_id, is_del: 0})
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
        return this.sendVerificationCode(userTbl.email, verification_code)
    }

    /**
     * forgot password
     * @param forgotPassModel
     */
    async forgotPass(forgotPassModel: ForgotPassModel): Promise<number> {
        ParamValidation.validateEmail(forgotPassModel.email)

        const resetPassCode = randomUUID().replace(/-/g, '')
        await this.limitForgotCall(forgotPassModel.email, resetPassCode)

        // send reset password link
        const mailer = new EmailSender(this.env, this.logger)
        return mailer.sendEmail(forgotPassModel.email, 'Reset password!', `Reset password code is: ${resetPassCode}`)
            .catch(() => 0)
    }

    private limitForgotCall = async (email: string, resetPassCode: string) => {
        const userTbl = await this.userDb.select(
            <UserTbl>{user_id: '', forgot_pass_count: undefined, forgot_pass_date: undefined},
            <UserTbl>{is_del: 0, email: email}
        )
        if (ValueHelper.isEmpty(userTbl.forgot_pass_date) || DateHelper.addDays(userTbl.forgot_pass_date, 1) < new Date()) {
            const forgotPassDate = new DateDb().value
            await this.userDb.update(
                <UserTbl>{reset_pass_code: resetPassCode, forgot_pass_count: 1, forgot_pass_date: forgotPassDate},
                <UserTbl>{is_del: 0, user_id: userTbl.user_id}
            )
        } else if (DateHelper.addDays(userTbl.forgot_pass_date, 1) > new Date() && userTbl.forgot_pass_count < 6) {
            const forgotPassCount = userTbl.forgot_pass_count + 1
            await this.userDb.update(
                <UserTbl>{reset_pass_code: resetPassCode, forgot_pass_count: forgotPassCount},
                <UserTbl>{is_del: 0, user_id: userTbl.user_id}
            )
        } else {
            throw new ErrorApi500(ErrorsMsg.TooManyTimeResetPassword)
        }
    }

    /**
     * reset password
     * @param resetPassModel
     */
    async resetPass(resetPassModel: ResetPassModel): Promise<number> {
        ParamValidation.allFieldRequired(resetPassModel)
        ParamValidation.validateEmail(resetPassModel.email)
        ParamValidation.validateUuId(resetPassModel.resetPassCode, false)

        await this.limitResetCall(resetPassModel.email)

        const saltedHash = PasswordHash.createSaltedHash(resetPassModel.password)
        return this.userDb.update(
            <UserTbl>{password_hash: saltedHash.passwordHash, password_salt: saltedHash.passwordSalt},
            <UserTbl>{is_del: 0, email: resetPassModel.email, reset_pass_code: resetPassModel.resetPassCode}
        )
    }

    private limitResetCall = async (email: string) => {
        const userTbl = await this.userDb.select(
            <UserTbl>{user_id: undefined, reset_pass_count: undefined, reset_pass_date: undefined},
            <UserTbl>{is_del: 0, email: email}
        )

        if (ValueHelper.isEmpty(userTbl.reset_pass_date) ||
            DateHelper.addMinutes(userTbl.reset_pass_date, 15) < new Date()
        ) {
            const resetPassDate = new DateDb().value
            await this.userDb.update(
                <UserTbl>{reset_pass_count: 1, reset_pass_date: resetPassDate},
                <UserTbl>{is_del: 0, user_id: userTbl.user_id}
            )
        } else if (DateHelper.addMinutes(userTbl.reset_pass_date, 15) > new Date() && userTbl.reset_pass_count < 6) {
            const resetPassCount = userTbl.reset_pass_count + 1
            await this.userDb.update(
                <UserTbl>{reset_pass_count: resetPassCount},
                <UserTbl>{is_del: 0, user_id: userTbl.user_id}
            )
        } else {
            throw new ErrorApi500(ErrorsMsg.TooManyTimeEnterCode)
        }
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
