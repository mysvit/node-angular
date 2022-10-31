import { CommentsItem } from '@dto'
import { Select } from '@shared'
import { Db } from '../../engine'

export class CommentsDb extends Db {

    table = 'comments'

    async list(select: Select): Promise<Array<CommentsItem>> {
        const sel = `
            SELECT
                c.comment_id,
                c.comment,
                c.write_date,
                c.likes_count,
                c.dislikes_count,
                c.replies_count,
                u.nickname,
                u.avatar_id,
                cl.is_like AS like_user,
                cl.is_dislike AS dislike_user
            FROM 
                comments c
                JOIN users u ON c.user_id = u.user_id
                LEFT OUTER JOIN comments_likes cl ON cl.comment_id = c.comment_id AND c.user_id = cl.user_id
        `
        const values = []
        return this.conn.query(sel, values)
    }

    async updateLikesCount(comment_id: string, is_like: number, is_dislike: number): Promise<number> {
        const sql = `UPDATE ${this.table} SET likes_count = likes_count + ?, dislikes_count = dislikes_count + ? WHERE comment_id = ?`
        return this.conn.query(sql, [is_like, is_dislike, comment_id])
            .then(data => data.affectedRows)
    }

}
