import { User } from '@dto/dto.js'
import { CoreBase } from '../core-base.js'

export class CoreUser extends CoreBase {

    async getById(user_id: string): Promise<User> {
        return await this.dbUser.getById(user_id)
    }

}