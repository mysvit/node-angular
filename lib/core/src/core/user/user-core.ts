import { IUser, SignupModel, User } from '@dto'
import { ErrorApi500, ErrorsMsg, PasswordHash, ValueHelper } from '@shared'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class UserCore extends Core {

    async getById(query): Promise<User> {
        ParamValidation.validateId(query?.user_id)
        return await this.dbUser.getById(query?.user_id)
    }

    async signup(model: SignupModel): Promise<string> {
        if (ValueHelper.isEmpty(model.username) || ValueHelper.isEmpty(model.email) || ValueHelper.isEmpty(model.password)) {
            throw new ErrorApi500(ErrorsMsg.FieldsRequired)
        }
        if (await this.dbUser.isEmailExist(model.email)) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
        if (await this.dbUser.isUserExist(model.username)) {
            throw new ErrorApi500(ErrorsMsg.UserRegistered)
        }
        const id = randomUUID()
        const hash = PasswordHash.create(model.password)
        const user: User = new User(<IUser>{
            user_id: id,
            user_name: model.username,
            user_email: model.email,
            user_hash: hash
        })
        return this.dbUser.add(user)
    }

}
