import { CommentsDb, CommentsLikesDb } from '@db'
import { CommentsLikesModel, CommentsLikesTbl, CommentsLikesWhere, DateDb } from '@dto'
import { CommentsLikesDtoHelper } from '@shared'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class CommentsLikesCore extends Core {

    private commentsLikesDb = new CommentsLikesDb(this.pool)
    private commentsDb = new CommentsDb(this.pool)

    async add(userId: string, model: CommentsLikesModel): Promise<number> {
        ParamValidation.validateUuId(userId)
        const commentsLikesTbl = CommentsLikesDtoHelper.commentsLikesTblFromModel(model, userId)
        // get current like if exist
        const commentsLikesCurrent = await this.commentsLikesDb.select(<CommentsLikesTbl>{comment_like_id: '', is_like: 0, is_dislike: 0},
            <CommentsLikesTbl>{user_id: userId, comment_id: model.comment_id})
        let likeCount = commentsLikesTbl.is_like
        let dislikeCount = commentsLikesTbl.is_dislike
        if (commentsLikesCurrent) {
            likeCount += commentsLikesCurrent.is_like * -1
            dislikeCount += commentsLikesCurrent.is_dislike * -1
            await this.commentsDb.updateLikesCount(model.comment_id, likeCount, dislikeCount)
            return this.commentsLikesDb.update(<CommentsLikesTbl>{
                    write_date: new DateDb().value, is_like: commentsLikesTbl.is_like, is_dislike: commentsLikesTbl.is_dislike
                },
                <CommentsLikesTbl>{comment_like_id: commentsLikesCurrent.comment_like_id})
        } else {
            await this.commentsDb.updateLikesCount(model.comment_id, likeCount, dislikeCount)
            return this.commentsLikesDb.insert(commentsLikesTbl)
        }
    }

    async list(userId: string, commentsLikesWhere: CommentsLikesWhere): Promise<Array<CommentsLikesModel>> {
        ParamValidation.validateUuId(userId)
        commentsLikesWhere.userId = userId
        return this.commentsLikesDb.list(commentsLikesWhere)
    }

}
