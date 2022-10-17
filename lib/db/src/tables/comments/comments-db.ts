import { Select } from '@shared'
import { Db } from '../../engine/db'

export class CommentsDb extends Db {

    table = 'comments'

    async list(select: Select): Promise<any> {
        const sel = `
            SELECT
                c.comment_id,
                c.comment,
                c.write_date,
                u.nickname,
                u.avatar_id 
            FROM 
                comments c,
                users u 
            WHERE 
                c.user_id = u.user_id
        `
        const values = []
        return await this.dbQuery(sel, values)
    }

}
