import { User } from '@dto/dto.js'
import { ErrorApi500 } from '@shared/errors/index.js'
import { ErrorsMsg } from '@shared/translation/errors-msg.js'
import { randomUUID } from 'crypto'
import { CoreBase } from '../core-base.js'
import { ParamValidation } from '../validation/param-validation.js'

export class CoreUser extends CoreBase {

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