import { CommentsLikesModel, CommentsLikesWhere } from '@dto'
import { Db } from '../../engine'

export class CommentsLikesDb extends Db {

    table = 'comments_likes'

    async list(commentsLikesWhere: CommentsLikesWhere): Promise<Array<CommentsLikesModel>> {
        const sel = `
            SELECT 
                comment_id,
                is_like,
                is_dislike
            FROM
                comments_likes
            WHERE 
                user_id = ? AND 
                comment_id IN (?)
        `
        const values = [commentsLikesWhere.userId, [...commentsLikesWhere.commentIds]]
        return await this.dbQuery(sel, values)
    }

}
