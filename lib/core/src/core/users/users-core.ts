import { PicturesDb, UsersDb } from '@db'
import { AuthModel, AuthType, DateType, EmailModel, ResetPassModel, SignInModel, UserSignupModel, UsersTbl, VerifyCodeModel } from '@dto'
import { DateHelper, EmailSender, ErrorApi500, ErrorsMsg, PasswordHash, PicturesDtoHelper, UsersDtoHelper, ValueHelper, VerificationCode } from '@shared'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

const {sign} = jwt

export class UsersCore extends Core {

    usersDb = new UsersDb(this.pool)
    picturesDb = new PicturesDb(this.pool)

    /**
     * signup user
     * @param model
     */
    async signup(model: UserSignupModel): Promise<number> {
        model = new UserSignupModel(model)
        ParamValidation.allFieldRequired(model)
        await this.isEmailExist(model.email)
        const PicturesTbl = PicturesDtoHelper.PicturesTblFromModel(model.avatar)
        await this.picturesDb.insert(PicturesTbl)
        const UsersTbl = UsersDtoHelper.UsersTblFromModel(model, PicturesTbl.picture_id)
        await this.usersDb.insert(UsersTbl)
        return this.sendVerificationCode(UsersTbl.email, UsersTbl.verification_code)
    }

    private isEmailExist = async (email: string): Promise<void> => {
        const result = await this.usersDb.select(
            <UsersTbl>{user_id: undefined},
            <UsersTbl>{is_del: 0, email: email})
        if (!!result) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
    }

    private sendVerificationCode = async (to: string, verificationCode: string): Promise<number> => {
        const mailer = new EmailSender(this.env, this.logger)
        return mailer.sendEmail(to, 'Verification code!', `Your verification code is - ${verificationCode}`)
    }

    /**
     * signIn user
     * @param model
     */
    async signIn(model: SignInModel): Promise<AuthModel> {
        model = new SignInModel(model)
        ParamValidation.allFieldRequired(model)
        const UsersTbl: UsersTbl = await this.getUserIfExist(model)
        const needConfirm: AuthModel = await this.checkIfNeedConfirmation(model, UsersTbl)
        if (needConfirm) return needConfirm
        return this.getTokenIfPassOk(model, UsersTbl)
    }

    private getUserIfExist = async (model: SignInModel): Promise<UsersTbl> => {
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{
                user_id: '',
                email: '',
                nickname: '',
                avatar_id: '',
                password_hash: '',
                password_salt: '',
                is_verified: 0
            },
            <UsersTbl>{email: model.email, is_del: 0}
        )
        if (ValueHelper.isEmpty(UsersTbl)) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        return UsersTbl
    }
    private checkIfNeedConfirmation = async (model: SignInModel, UsersTbl: UsersTbl): Promise<AuthModel> => {
        // if not confirmed & update pre_confirmed_hash and ask for confirmation
        const verifiedHash = PasswordHash.createSaltedHash(model.password, UsersTbl.password_salt)
        if (UsersTbl.is_verified == 0) {
            await this.usersDb.update(
                <UsersTbl>{pre_verified_hash: verifiedHash.passwordHash},
                <UsersTbl>{user_id: UsersTbl.user_id, is_del: 0})
            return <AuthModel>{userId: UsersTbl.user_id, email: UsersTbl.email, authType: AuthType.NeedVerification}
        } else {
            return undefined
        }
    }
    private getTokenIfPassOk = async (model: SignInModel, UsersTbl: UsersTbl): Promise<AuthModel> => {
        const verifiedHash = PasswordHash.createSaltedHash(model.password, UsersTbl.password_salt)
        // if confirmed check password
        if (verifiedHash.passwordHash !== UsersTbl.password_hash) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        await this.usersDb.update(
            <UsersTbl>{sign_in_date: new DateType().value},
            <UsersTbl>{user_id: UsersTbl.user_id, is_del: 0})
        // create token by sign
        const token = sign({user_id: UsersTbl.user_id}, this.env.token_key, {expiresIn: '2h'})
        return <AuthModel>{
            userId: UsersTbl.user_id,
            email: UsersTbl.email,
            nickname: UsersTbl.nickname,
            avatarId: UsersTbl.avatar_id,
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
        const result = await this.usersDb.select(
            <UsersTbl>{user_id: '', is_verified: 0, verification_code: ''},
            <UsersTbl>{is_del: 0, user_id: userId})
        if (result.is_verified || result.verification_code === verificationCode) {
            return
        }
        throw new ErrorApi500(ErrorsMsg.VerificationCodeWrong)
    }
    private markUserVerified = async (userId: string) => {
        return this.usersDb.update(
            <UsersTbl>{is_verified: 1, verification_code: null},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
    }
    private getTokenAfterVerification = async (userId: string): Promise<AuthModel> => {
        // get previously sign_in generated hash
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{email: '', nickname: '', avatar_id: '', pre_verified_hash: '', password_hash: ''},
            <UsersTbl>{is_del: 0, user_id: userId}
        )
        // create token by sign if password verified
        if (UsersTbl.pre_verified_hash === UsersTbl.password_hash) {
            await this.usersDb.update(
                <UsersTbl>{sign_in_date: new DateType().value, pre_verified_hash: null},
                <UsersTbl>{is_del: 0, user_id: userId})
            const token = sign({user_id: userId}, this.env.token_key, {expiresIn: '2h'})
            return <AuthModel>{
                userId: userId,
                email: UsersTbl.email,
                nickname: UsersTbl.nickname,
                avatarId: UsersTbl.avatar_id,
                token: token,
                authType: AuthType.Authenticated
            }
        } else {
            return <AuthModel>{
                userId: userId,
                email: UsersTbl.email,
                authType: AuthType.VerifiedButNotAuth
            }
        }
    }

    /**
     * send verification code
     * @param userId
     */
    async resendCode(userId: string) {
        ParamValidation.validateUuId(userId)
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{email: ''},
            <UsersTbl>{is_del: 0, user_id: userId})
        const verification_code = VerificationCode.generate()
        await this.usersDb.update(
            <UsersTbl>{verification_code: verification_code},
            <UsersTbl>{user_id: userId, is_del: 0})
        return this.sendVerificationCode(UsersTbl.email, verification_code)
    }

    /**
     * forgot password
     * @param emailModel
     */
    async forgotPass(emailModel: EmailModel): Promise<void> {
        ParamValidation.validateEmail(emailModel.email)

        const resetPassCode = randomUUID().replace(/-/g, '')
        await this.limitForgotCall(emailModel.email, resetPassCode)

        // send reset password link
        const mailer = new EmailSender(this.env, this.logger)
        const result = await mailer.sendEmail(emailModel.email, 'Reset password!', `Reset password code is: ${resetPassCode}`)
        if (result === 0) {
            throw new ErrorApi500(ErrorsMsg.SendEmail)
        }
    }

    private limitForgotCall = async (email: string, resetPassCode: string) => {
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{user_id: '', forgot_pass_count: undefined, forgot_pass_date: undefined},
            <UsersTbl>{is_del: 0, email: email}
        )
        if (ValueHelper.isEmpty(UsersTbl.forgot_pass_date) || DateHelper.addDays(UsersTbl.forgot_pass_date, 1) < new Date()) {
            const forgotPassDate = new DateType().value
            await this.usersDb.update(
                <UsersTbl>{reset_pass_code: resetPassCode, forgot_pass_count: 1, forgot_pass_date: forgotPassDate},
                <UsersTbl>{is_del: 0, user_id: UsersTbl.user_id}
            )
        } else if (DateHelper.addDays(UsersTbl.forgot_pass_date, 1) > new Date() && UsersTbl.forgot_pass_count < 6) {
            const forgotPassCount = UsersTbl.forgot_pass_count + 1
            await this.usersDb.update(
                <UsersTbl>{reset_pass_code: resetPassCode, forgot_pass_count: forgotPassCount},
                <UsersTbl>{is_del: 0, user_id: UsersTbl.user_id}
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
        return this.usersDb.update(
            <UsersTbl>{password_hash: saltedHash.passwordHash, password_salt: saltedHash.passwordSalt},
            <UsersTbl>{is_del: 0, email: resetPassModel.email, reset_pass_code: resetPassModel.resetPassCode}
        )
    }

    private limitResetCall = async (email: string) => {
        const UsersTbl = await this.usersDb.select(
            <UsersTbl>{user_id: undefined, reset_pass_count: undefined, reset_pass_date: undefined},
            <UsersTbl>{is_del: 0, email: email}
        )

        if (ValueHelper.isEmpty(UsersTbl.reset_pass_date) ||
            DateHelper.addMinutes(UsersTbl.reset_pass_date, 15) < new Date()
        ) {
            const resetPassDate = new DateType().value
            await this.usersDb.update(
                <UsersTbl>{reset_pass_count: 1, reset_pass_date: resetPassDate},
                <UsersTbl>{is_del: 0, user_id: UsersTbl.user_id}
            )
        } else if (DateHelper.addMinutes(UsersTbl.reset_pass_date, 15) > new Date() && UsersTbl.reset_pass_count < 6) {
            const resetPassCount = UsersTbl.reset_pass_count + 1
            await this.usersDb.update(
                <UsersTbl>{reset_pass_count: resetPassCount},
                <UsersTbl>{is_del: 0, user_id: UsersTbl.user_id}
            )
        } else {
            throw new ErrorApi500(ErrorsMsg.TooManyTimeEnterCode)
        }
    }

}
