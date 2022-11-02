import { CommentSet, CommentsTbl, DateDb } from '@dto'

export namespace CommentsDtoHelper {

    export function setToTbl(model: CommentSet, userId: string): CommentsTbl {
        return <CommentsTbl>{
            comment_id: model.commentId,
            parent_id: model.parentId,
            user_id: userId,
            write_date: new DateDb().value
        }
    }

}
