import { CommentsDb } from '@db'
import { CommentItem, CommentModel, CommentsTbl } from '@dto'
import { CommentsDtoHelper, Select, SelectLimit } from '@shared'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class CommentsCore extends Core {

    private commentsDb = new CommentsDb(this.pool)

    async add(userId: string, model: CommentModel): Promise<string> {
        model.commentId = randomUUID()
        const commentsTbl = CommentsDtoHelper.modelToTbl(model, userId)
        await this.commentsDb.insert(commentsTbl)
        return model.commentId
    }

    async upd(userId: string, model: CommentModel): Promise<number> {
        const commentsTbl = CommentsDtoHelper.modelToTbl(model, userId)
        return this.commentsDb.update(
            commentsTbl,
            <CommentsTbl>{comment_id: commentsTbl.comment_id, user_id: userId}
        )
    }

    async del(userId: string, commentId: string): Promise<number> {
        ParamValidation.validateUuId(commentId)
        return this.commentsDb.update(
            <CommentsTbl>{is_del: 1},
            <CommentsTbl>{comment_id: commentId, user_id: userId}
        )
    }

    async get(commentId: string): Promise<CommentsTbl> {
        ParamValidation.validateUuId(commentId)
        return this.commentsDb.select(
            <CommentsTbl>{
                comment_id: undefined,
                is_del: undefined,
                user_id: undefined,
                comment: undefined
            },
            <CommentsTbl>{comment_id: commentId}
        )
    }

    async list(select: Select): Promise<Array<CommentItem>> {
        const sel = <Select>{
            selectLimit: <SelectLimit>{limit: 5}
        }
        return this.commentsDb.list(sel)
    }

}
