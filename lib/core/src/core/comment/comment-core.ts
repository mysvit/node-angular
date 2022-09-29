import { CommentsTbl } from '@dto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class CommentCore extends Core {

    async add(userId: string, commentsTbl: CommentsTbl): Promise<number> {
        ParamValidation.validateUuId(userId)
        commentsTbl.user_id = userId
        return this.commentDb.insert(commentsTbl)
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

    async list(): Promise<CommentsTbl> {
        return this.commentDb.list<CommentsTbl>(
            <CommentsTbl>{
                comment_id: undefined,
                is_del: undefined,
                user_id: undefined,
                write_date: undefined,
                comment: undefined
            },
            <CommentsTbl>{is_del: undefined}
        )
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

}
