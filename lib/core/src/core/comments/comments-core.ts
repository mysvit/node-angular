import { CommentsDb, Db } from '@db'
import { CommentItem, CommentModel, CommentsSelectWhere, CommentsTbl } from '@dto'
import { CommentsDtoHelper } from '@shared'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class CommentsCore extends Core {

    private commentsDb = new CommentsDb(this.pool)

    async add(userId: string, model: CommentModel): Promise<string> {
        model.commentId = randomUUID()
        const commentsTbl = CommentsDtoHelper.modelToTbl(model, userId)
        const trCatch = Db.transactionCatch(async <Number>(conn) => {
            const commentsDb = new CommentsDb(conn)
            await commentsDb.insert(commentsTbl)
            // for replay a comment
            if (commentsTbl.parent_id) {
                await commentsDb.updateRepliesCount(commentsTbl.parent_id, 1)
            }
            return model.commentId
        })
        return trCatch(await this.pool.getConnection())
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
        const commentsTbl: CommentsTbl = await this.commentsDb.selectOne(<CommentsTbl>{comment_id: commentId, user_id: userId})
        if (commentsTbl) {
            const trCatch = Db.transactionCatch(async <Number>(conn) => {
                const commentsDb2 = new CommentsDb(conn)
                // for replay a comment
                if (commentsTbl.parent_id) {
                    await commentsDb2.updateRepliesCount(commentsTbl.parent_id, -1)
                }
                return commentsDb2.update(
                    <CommentsTbl>{is_del: 1},
                    <CommentsTbl>{comment_id: commentsTbl.comment_id}
                )
            })
            return trCatch(await this.pool.getConnection())
        } else {
            return 0
        }
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

    async list(userId: string, where: CommentsSelectWhere): Promise<Array<CommentItem>> {
        return this.commentsDb.list(userId, where)
    }

}
