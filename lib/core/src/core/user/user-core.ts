import { LoginModel, SignupModel, TokenModel, UserProfileShort, UserSignup } from '@dto'
import { environment } from '@env'
import { ErrorApi500, ErrorsMsg, PasswordHash, ValueHelper } from '@shared'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

const {sign} = jwt

export class UserCore extends Core {

    async signup(model: SignupModel): Promise<string> {
        if (ValueHelper.isEmpty(model.username) || ValueHelper.isEmpty(model.email) || ValueHelper.isEmpty(model.password)) {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        }
        if (await this.dbUser.isEmailExist(model.email)) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
        if (await this.dbUser.isNameExist(model.username)) {
            throw new ErrorApi500(ErrorsMsg.UserRegistered)
        }
        const id = randomUUID()
        const saltedHash = PasswordHash.createSaltedHash(model.password)
        const user = new UserSignup(<UserSignup>{
            user_id: id,
            username: model.username,
            email: model.email,
            password_hash: saltedHash.passwordHash,
            password_salt: saltedHash.passwordSalt
        })
        return this.dbUser.signup(user)
    }

    async login(model: LoginModel): Promise<TokenModel> {
        if (ValueHelper.isEmpty(model.email) || ValueHelper.isEmpty(model.password)) {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        }
        const user = await this.dbUser.getSecurityInfo(model.email)
        if (ValueHelper.isEmpty(user)) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        if (!PasswordHash.isValidPassword(model.password, user.password_salt, user.password_hash)) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }

        const token = sign({user_id: user.user_id}, environment.token_key, {expiresIn: '2h'})
        return <TokenModel>{user_id: user.user_id, token: token}
    }

    async getProfileShort(query): Promise<UserProfileShort> {
        ParamValidation.validateId(query?.user_id)
        return await this.dbUser.getProfileShort(query?.user_id)
    }

}
