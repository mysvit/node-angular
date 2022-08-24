import { AuthModel, DateDb, LoginModel, UserSignupModel, UserTbl } from '@dto'
import { environment } from '@env'
import { ErrorApi500, ErrorsMsg, PasswordHash, ValueHelper } from '@shared'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

const {sign} = jwt

export class UserCore extends Core {

    async signup(model: UserSignupModel): Promise<number> {
        model = new UserSignupModel(model)
        ParamValidation.allFieldRequired(model)
        this.isEmailExist(model.email)
        const userTbl = this.createSignupModel(model)
        return this.userDb.insert(userTbl)
    }

    async login(model: LoginModel): Promise<AuthModel> {
        model = new LoginModel(model)
        ParamValidation.allFieldRequired(model)
        const userTbl = await this.getUserIfExist(model)
        const confirm = await this.needConfirmation(model, userTbl)
        if (confirm) return confirm
        return this.getTokenIfVerified(model, userTbl)
    }

    private isEmailExist(email: string): void {
        const result = this.userDb.select(
            <UserTbl>{user_id: undefined},
            <UserTbl>{is_del: 0, email: email})
        if (!!result) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
    }

    private createSignupModel(model: UserSignupModel): UserTbl {
        const saltedHash = PasswordHash.createSaltedHash(model.password)
        return <UserTbl>{
            user_id: randomUUID(),
            email: model.email,
            nickname: model.nickname,
            signup_date: new DateDb().value,
            password_hash: saltedHash.passwordHash,
            password_salt: saltedHash.passwordSalt
        }
    }


    private async getUserIfExist(model: LoginModel): Promise<UserTbl> {
        const userTbl = await this.userDb.select(
            <UserTbl>{user_id: undefined, password_salt: undefined, is_confirmed: undefined},
            <UserTbl>{email: model.email, is_del: 0}
        )
        if (ValueHelper.isEmpty(userTbl)) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        return userTbl
    }

    private async needConfirmation(model: LoginModel, userTbl: UserTbl): Promise<AuthModel> {
        // if not confirmed & update pre_confirmed_hash and ask for confirmation
        const verifiedHash = PasswordHash.createSaltedHash(model.password, userTbl.password_salt)
        if (userTbl.is_confirmed == 0) {
            await this.userDb.update(
                <UserTbl>{pre_confirmed_hash: verifiedHash.passwordHash},
                <UserTbl>{user_id: userTbl.user_id, is_del: 0})
            return <AuthModel>{user_id: userTbl.user_id, need_confirm: 1}
        } else {
            return undefined
        }
    }

    private getTokenIfVerified(model: LoginModel, userTbl: UserTbl): AuthModel {
        const verifiedHash = PasswordHash.createSaltedHash(model.password, userTbl.password_salt)
        // if confirmed check password
        if (verifiedHash.passwordHash !== userTbl.password_hash) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        // create token by sign
        const token = sign({user_id: userTbl.user_id}, environment.token_key, {expiresIn: '2h'})
        return <AuthModel>{user_id: userTbl.user_id, token: token}
    }

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
