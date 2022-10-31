import { CommentsDb, CommentsLikesDb } from '@db'
import { CommentsLikesModel, CommentsLikesSelectOneWhere, CommentsLikesTbl, DateDb } from '@dto'
import { CommentsLikesDtoHelper, LikeDislike, LikeDislikeCalc } from '@shared'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class CommentsLikesCore extends Core {

    // add, remove, update likes for comment
    async set(userId: string, model: CommentsLikesModel): Promise<LikeDislikeCalc> {
        ParamValidation.validateUuId(userId)
        const commentsLikesUserSend = CommentsLikesDtoHelper.modelToTbl(model, userId)

        const conn = await this.pool.getConnection()
        const commentsLikesDb = new CommentsLikesDb(conn)
        const commentsDb = new CommentsDb(conn)
        await conn.beginTransaction()
        try {

            // get current like if exist
            const commentsLikesCurrent: CommentsLikesTbl = await commentsLikesDb.selectOne(<CommentsLikesSelectOneWhere>{
                user_id: userId,
                comment_id: model.comment_id
            })
            const ld = LikeDislike.calc(
                commentsLikesUserSend.is_like, commentsLikesUserSend.is_dislike,
                commentsLikesCurrent?.is_like, commentsLikesCurrent?.is_dislike)
            if (commentsLikesCurrent) {
                await commentsLikesDb.update(
                    <CommentsLikesTbl>{
                        write_date: new DateDb().value,
                        is_like: ld.likeUsr,
                        is_dislike: ld.dislikeUsr
                    },
                    <CommentsLikesTbl>{
                        comment_like_id: commentsLikesCurrent.comment_like_id
                    })
                await commentsDb.updateLikesCount(model.comment_id, ld.likeCount, ld.dislikeCount)
            } else {
                await commentsLikesDb.insert({...commentsLikesUserSend, is_like: ld.likeUsr, is_dislike: ld.dislikeUsr})
                await commentsDb.updateLikesCount(model.comment_id, ld.likeCount, ld.dislikeCount)
            }
            return ld
        } catch (e) {
            await conn.rollback()
        } finally {
            await conn.commit()
            await conn.end()
        }
    }

}
