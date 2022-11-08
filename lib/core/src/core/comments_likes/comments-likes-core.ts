import { CommentsDb, CommentsLikesDb, Db } from '@db'
import { CommentLikeModel, CommentsLikesSelectOneWhere, CommentsLikesTbl, DateType } from '@dto'
import { CommentsLikesDtoHelper, LikeDislike, LikeDislikeCalc } from '@shared'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class CommentsLikesCore extends Core {

    // add, remove, update likes for comment
    async set(userId: string, model: CommentLikeModel): Promise<LikeDislikeCalc> {
        ParamValidation.validateUuId(userId)
        const commentsLikesUserSend = CommentsLikesDtoHelper.modelToTbl(model, userId)

        const trCatch = Db.transactionCatch(async <LikeDislikeCalc>(conn) => {
            const commentsLikesDb = new CommentsLikesDb(conn)
            const commentsDb = new CommentsDb(conn)
            // get current like record if exist
            const commentsLikesCurrent: CommentsLikesTbl = await commentsLikesDb.selectOne(<CommentsLikesSelectOneWhere>{
                user_id: userId,
                comment_id: model.comment_id
            })
            const ld = LikeDislike.calc(
                commentsLikesUserSend.is_like, commentsLikesUserSend.is_dislike,
                commentsLikesCurrent?.is_like, commentsLikesCurrent?.is_dislike)
            if (commentsLikesCurrent) {
                // update exist
                await commentsLikesDb.update(
                    <CommentsLikesTbl>{
                        write_date: new DateType().value,
                        is_like: ld.likeUsr,
                        is_dislike: ld.dislikeUsr
                    },
                    <CommentsLikesTbl>{
                        comment_like_id: commentsLikesCurrent.comment_like_id
                    })
                await commentsDb.updateLikesCount(model.comment_id, ld.likeCount, ld.dislikeCount)
            } else {
                // create new record
                await commentsLikesDb.insert({...commentsLikesUserSend, is_like: ld.likeUsr, is_dislike: ld.dislikeUsr})
                await commentsDb.updateLikesCount(model.comment_id, ld.likeCount, ld.dislikeCount)
            }
            return ld
        })

        return trCatch(await this.pool.getConnection())
    }

}
