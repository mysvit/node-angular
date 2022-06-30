import { User } from '@dto'
import { ErrorApi500, ErrorsMsg } from '@shared'
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
        const res = await this.dbUser.isExist(user.user_name, user.user_email)
        if (res) {
            throw new ErrorApi500(ErrorsMsg.EmailRegistered)
        }
        user.user_id = randomUUID()
        return this.dbUser.add(user)
    }

}