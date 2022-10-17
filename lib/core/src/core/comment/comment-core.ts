import { CommentsTbl } from '@dto'
import { Select, SelectLimit } from '@shared'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class CommentCore extends Core {

    async add(userId: string, commentsTbl: CommentsTbl): Promise<number> {
        ParamValidation.validateUuId(userId)
        commentsTbl.user_id = userId
        return this.commentDb.insert(commentsTbl)
    }

    async upd(commentsTbl: CommentsTbl): Promise<number> {
        return this.commentDb.update(
            commentsTbl,
            <CommentsTbl>{comment_id: commentsTbl.comment_id}
        )
    }

    async del(commentId: string): Promise<number> {
        ParamValidation.validateUuId(commentId)
        return this.commentDb.delete({comment_id: commentId})
    }

    async get(commentId: string): Promise<CommentsTbl> {
        ParamValidation.validateUuId(commentId)
        return this.commentDb.select(
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

    async list(select: Select): Promise<CommentsTbl> {
        const sel = <Select>{
            selectLimit: <SelectLimit>{limit: 5}
        }
        return this.commentDb.list(sel)
    }

}
