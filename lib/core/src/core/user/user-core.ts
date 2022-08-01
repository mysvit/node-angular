import { User } from '@dto'
import { ErrorApi500, ErrorsMsg, ValueHelper } from '@shared'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class UserCore extends Core {

    async getById(query): Promise<User> {
        ParamValidation.validateId(query?.user_id)
        return await this.dbUser.getById(query?.user_id)
    }

    async add(body): Promise<string> {
        const user = new User(body)
        if (ValueHelper.isEmpty(user.user_email) || await this.dbUser.isEmailExist(user.user_email)) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
        if (ValueHelper.isEmpty(user.user_name) || await this.dbUser.isUserExist(user.user_name)) {
            throw new ErrorApi500(ErrorsMsg.UserRegistered)
        }
        if (ValueHelper.isEmpty(user.user_pass)) {
            throw new ErrorApi500(ErrorsMsg.UserPassword)
        }
        user.user_id = randomUUID()
        return this.dbUser.add(user)
    }

}
