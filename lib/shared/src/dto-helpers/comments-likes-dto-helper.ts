import { CommentsLikesModel, CommentsLikesTbl, DateDb } from '@dto'
import { randomUUID } from 'crypto'

export namespace CommentsLikesDtoHelper {

    export function modelToTbl(model: CommentsLikesModel, userId: string): CommentsLikesTbl {
        if (model.is_like > 1) model.is_like = 1
        if (model.is_dislike > 1) model.is_dislike = 1
        if (model.is_like < 0) model.is_like = 0
        if (model.is_dislike < 0) model.is_dislike = 0
        if (model.is_like === 1) model.is_dislike = 0
        return <CommentsLikesTbl>{
            comment_like_id: randomUUID(),
            user_id: userId,
            comment_id: model.comment_id,
            write_date: new DateDb().value,
            is_like: model.is_like,
            is_dislike: model.is_dislike
        }
    }

}
