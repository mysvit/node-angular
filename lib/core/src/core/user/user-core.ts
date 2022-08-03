import { IUser, SignupModel, User } from '@dto'
import { ErrorApi500, ErrorsMsg, PasswordHash, ValueHelper } from '@shared'
import { randomUUID } from 'crypto'
import { LoginModel } from '../../../../../dist/lib/dto/models/login-model'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class UserCore extends Core {

    async getById(query): Promise<User> {
        ParamValidation.validateId(query?.user_id)
        return await this.dbUser.getById(query?.user_id)
    }

    async signup(model: SignupModel): Promise<string> {
        if (ValueHelper.isEmpty(model.username) || ValueHelper.isEmpty(model.email) || ValueHelper.isEmpty(model.password)) {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        }
        if (await this.dbUser.isEmailExist(model.email)) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
        if (await this.dbUser.isUserExist(model.username)) {
            throw new ErrorApi500(ErrorsMsg.UserRegistered)
        }
        const id = randomUUID()
        const saltedHash = PasswordHash.createSaltedHash(model.password)
        const user: User = new User(<IUser>{
            user_id: id,
            user_name: model.username,
            user_email: model.email,
            user_hash: saltedHash.hash,
            user_salt: saltedHash.salt
        })
        return this.dbUser.add(user)
    }

    async login(model: LoginModel): Promise<string> {
        if (ValueHelper.isEmpty(model.email) || ValueHelper.isEmpty(model.password)) {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        }
        const user = await this.dbUser.getByEmail(model.email)
        if (PasswordHash.validatePassword(model.password, user.user_salt, user.user_hash)) {
            throw new ErrorApi500(ErrorsMsg.IncorrectEmailOrPassword)
        }
        return user.user_id
    }

}
