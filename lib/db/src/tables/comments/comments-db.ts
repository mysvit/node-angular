import { Select } from '@shared'
import { Db } from '../../engine'

export class CommentsDb extends Db {

    table = 'comments'

    async list(select: Select): Promise<any> {
        const sel = `
            SELECT
                u.nickname,
                u.avatar_id,
                c.comment_id,
                c.comment,
                c.write_date,
                c.likes_count,
                c.dislikes_count,
                c.replies_count
            FROM 
                comments c,
                users u 
            WHERE 
                c.user_id = u.user_id
        `
        const values = []
        return this.pool.query(sel, values)
    }

    async updateLikesCount(comment_id: string, is_like: number, is_dislike: number): Promise<number> {
        const sql = `UPDATE ${this.table} SET likes_count = likes_count + ?, dislikes_count = dislikes_count + ? WHERE comment_id = ?`
        return await this.dbExecute(sql, [is_like, is_dislike, comment_id])
            .then(data => data.affectedRows)
    }

}
