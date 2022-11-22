import { CommentItem, CommentsSelectWhere } from '@dto'
import { Db, SqlBuild } from '../../engine'
import LimitResult = SqlBuild.LimitResult


interface ListWhereResult {
    likesBuild: string
    whereBuild: string
    limitBuild: LimitResult
    values: Array<any>
}

export class CommentsDb extends Db {

    table = 'comments'

    getListWhere(userId: string, where: CommentsSelectWhere, isCount: boolean = false): ListWhereResult {
        const result = <ListWhereResult>{
            likesBuild: '',
            whereBuild: '',
            values: []
        }

        // LikesBuild
        if (!isCount) {
            result.likesBuild = 'JOIN (SELECT 0 AS is_like, 0 AS is_dislike) cl '
            if (userId) {
                result.likesBuild = 'LEFT OUTER JOIN comments_likes cl ON cl.comment_id = c.comment_id AND cl.user_id = ?'
                result.values.push(userId)
            }
        }

        // WhereBuild
        if (where?.parent_id) {
            result.whereBuild += ' AND c.parent_id = ?'
            result.values.push(where.parent_id)
        } else {
            result.whereBuild += ' AND c.parent_id is NULL'
        }
        if (where?.search) {
            result.whereBuild += ' AND c.comment like ?'
            result.values.push('%' + where.search + '%')
        }

        result.limitBuild = SqlBuild.limitBuild(where?.limit)

        return result
    }

    async list(userId: string, where: CommentsSelectWhere): Promise<Array<CommentItem>> {
        const listWhere = this.getListWhere(userId, where)
        const sel = `
            SELECT
                c.comment_id,
                c.parent_id,
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
                ${listWhere.likesBuild} 
            WHERE
                c.is_del = 0 
                ${listWhere.whereBuild}
            ORDER BY
                c.add_date
            ${listWhere.limitBuild.limit}
        `
        return this.conn.query(sel, [...listWhere.values, ...listWhere.limitBuild.values])
    }

    async listCount(userId: string, where: CommentsSelectWhere): Promise<number> {
        const listWhere = this.getListWhere(userId, where, true)
        const sel = `
            SELECT 
                BigToInt(COUNT(*)) AS cnt  
            FROM
                comments c  
            WHERE
                c.is_del = 0 
                ${listWhere.whereBuild}`
        return this.conn.query(sel, listWhere.values)
            .then(data => data[0]['cnt'])
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
