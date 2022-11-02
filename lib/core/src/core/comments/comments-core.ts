import { CommentsDb } from '@db'
import { CommentSet, CommentsItem, CommentsTbl } from '@dto'
import { CommentsDtoHelper, Select, SelectLimit } from '@shared'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class CommentsCore extends Core {

    private commentsDb = new CommentsDb(this.pool)

    async add(userId: string, commentSet: CommentSet): Promise<number> {
        ParamValidation.validateUuId(userId)
        commentSet.commentId = randomUUID()
        const commentsTbl = CommentsDtoHelper.setToTbl(commentSet, userId)
        return this.commentsDb.insert(commentsTbl)
    }

    async upd(commentsTbl: CommentsTbl): Promise<number> {
        return this.commentsDb.update(
            commentsTbl,
            <CommentsTbl>{comment_id: commentsTbl.comment_id}
        )
    }

    async del(commentId: string): Promise<number> {
        ParamValidation.validateUuId(commentId)
        return this.commentsDb.delete({comment_id: commentId})
    }

    async get(commentId: string): Promise<CommentsTbl> {
        ParamValidation.validateUuId(commentId)
        return this.commentsDb.select(
            <CommentsTbl>{
                comment_id: undefined,
                is_del: undefined,
                user_id: undefined,
                write_date: undefined,
                comment: undefined
            },
            <CommentsTbl>{comment_id: commentId}
        )
    }

    async list(select: Select): Promise<Array<CommentsItem>> {
        const sel = <Select>{
            selectLimit: <SelectLimit>{limit: 5}
        }
        return this.commentsDb.list(sel)
    }

}
