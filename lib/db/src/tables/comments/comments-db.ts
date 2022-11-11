import { CommentItem, CommentsSelectWhere } from '@dto'
import { Db } from '../../engine'

export class CommentsDb extends Db {

    table = 'comments'

    async list(userId: string, where: CommentsSelectWhere): Promise<Array<CommentItem>> {
        const values = []

        let likesBuild = 'JOIN (SELECT 0 AS is_like, 0 AS is_dislike) cl '
        if (userId) {
            likesBuild = 'LEFT OUTER JOIN comments_likes cl ON cl.comment_id = c.comment_id AND cl.user_id = ?'
            values.push(userId)
        }

        let whereBuild = ''
        if (where?.parent_id) {
            whereBuild += ' AND c.parent_id = ?'
            values.push(where.parent_id)
        } else {
            whereBuild += ' AND c.parent_id is NULL'
        }
        if (where?.search) {
            whereBuild += ' AND c.comment like ?'
            values.push('%' + where.search + '%')
        }

        const sel = `
            SELECT
                c.comment_id,
                c.comment,
                c.add_date,
                c.likes_count,
                c.dislikes_count,
                c.replies_count,
                u.user_id,
                u.nickname,
                u.avatar_id,
                cl.is_like AS like_user,
                cl.is_dislike AS dislike_user
            FROM 
                comments c
                JOIN users u ON u.user_id = c.user_id 
                ${likesBuild} 
            WHERE
                c.is_del = 0 
                ${whereBuild}
            ORDER BY
                c.add_date
        `
        return this.conn.query(sel, values)
    }

    async updateLikesCount(comment_id: string, is_like: number, is_dislike: number): Promise<number> {
        const sql = `UPDATE ${this.table} SET likes_count = likes_count + ?, dislikes_count = dislikes_count + ? WHERE comment_id = ?`
        return this.conn.query(sql, [is_like, is_dislike, comment_id])
            .then(data => data.affectedRows)
    }

    async updateRepliesCount(comment_id: string, count: number): Promise<number> {
        const sql = `
            UPDATE 
                ${this.table} 
            SET 
                replies_count = replies_count + ? 
            WHERE 
                comment_id = ?
        `
        return this.conn.query(sql, [count, comment_id])
            .then(data => data.affectedRows)
    }

}
