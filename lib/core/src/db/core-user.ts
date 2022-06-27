import { User } from '@dto/dto.js'
import { ErrorApi500 } from '@shared/errors/index.js'
import { ErrorsMsg } from '@shared/translation/errors-msg.js'
import { randomUUID } from 'crypto'
import { CoreBase } from '../core-base.js'

export class CoreUser extends CoreBase {

    async getById(user_id: string): Promise<User> {
        return await this.dbUser.getById(user_id)
    }

    async add(user: User): Promise<string> {
        return await this.dbUser.isExist(user.user_name, user.user_email)
            .then(res => {
                if (!res) {
                    throw new ErrorApi500(ErrorsMsg.EmailRegistered)
                }
                user.user_id = randomUUID()
                return this.dbUser.add(user)
            })
    }

}