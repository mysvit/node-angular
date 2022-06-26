import { DbUser } from '@db/db.js'
import { ISimple } from '@dto/dto.js'
import { CoreBase } from '../core-base.js'

export class User extends CoreBase {

    async getById(user_id: string): Promise<ISimple> {
        const dbUser = new DbUser(this.env)
        return await dbUser.getById(user_id)
    }

}