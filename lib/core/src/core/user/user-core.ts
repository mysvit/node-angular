import { AuthModel, DateDb, LoginModel, UserSignupModel, UserTbl } from '@dto'
import { environment } from '@env'
import { ErrorApi500, ErrorsMsg, PasswordHash, ValueHelper } from '@shared'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'
import { Core } from '../core'

const {sign} = jwt

export class UserCore extends Core {

    async signup(model: UserSignupModel): Promise<number> {
        model = new UserSignupModel(model)
        if (ValueHelper.isEmpty(model.nickname) || ValueHelper.isEmpty(model.email) || ValueHelper.isEmpty(model.password)) {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        }
        if (this.isEmailExist(model.email)) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
        const saltedHash = PasswordHash.createSaltedHash(model.password)
        const userTbl = <UserTbl>{
            user_id: randomUUID(),
            email: model.email,
            nickname: model.nickname,
            signup_date: new DateDb().value,
            password_hash: saltedHash.passwordHash,
            password_salt: saltedHash.passwordSalt
        }
        return this.userDb.insert(userTbl)
    }

    async login(model: LoginModel): Promise<AuthModel> {
        model = new LoginModel(model)
        if (ValueHelper.isEmpty(model.email) || ValueHelper.isEmpty(model.password)) {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        }
        // check email exist and get user data
        const userTbl = await this.userDb.select(
            <UserTbl>{user_id: undefined, password_salt: undefined, is_confirmed: undefined},
            <UserTbl>{email: model.email, is_del: 0}
        )
        if (ValueHelper.isEmpty(userTbl)) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        // if not confirmed & update pre_confirmed_hash and ask for confirmation
        const verifiedHash = PasswordHash.createSaltedHash(model.password, userTbl.password_salt)
        if (userTbl.is_confirmed == 0) {
            await this.userDb.update(
                <UserTbl>{pre_confirmed_hash: verifiedHash.passwordHash},
                <UserTbl>{user_id: userTbl.user_id, is_del: 0})
            return <AuthModel>{user_id: userTbl.user_id, need_confirm: 1}
        }
        // if confirmed check password
        if (verifiedHash.passwordHash !== userTbl.password_hash) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        // create token by sign
        const token = sign({user_id: userTbl.user_id}, environment.token_key, {expiresIn: '2h'})
        return <AuthModel>{user_id: userTbl.user_id, token: token}
    }

    // async confirmUser(user_id: string, confirm_code: string): Promise<boolean> {
    //     ParamValidation.validateId(user_id)
    //     return await this.userDb.confirmUser(user_id)
    // }
    //
    // async getProfileShort(user_id: string): Promise<UserProfileShortModel> {
    //     ParamValidation.validateId(user_id)
    //     const userTbl = await this.userDb.get(user_id)
    //     return <UserProfileShortModel>{
    //         user_id: userTbl.user_id,
    //         nickname: userTbl.nickname,
    //         email: userTbl.email
    //     }
    // }

    isEmailExist(email: string): boolean {
        const result = this.userDb.select(
            <UserTbl>{user_id: undefined},
            <UserTbl>{is_del: 0, email: email})
        return !!result
    }

}
