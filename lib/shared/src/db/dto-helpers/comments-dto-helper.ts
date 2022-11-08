import { CommentModel, CommentsTbl } from '@dto'

export namespace CommentsDtoHelper {

    export function modelToTbl(model: CommentModel, userId: string): CommentsTbl {
        return <CommentsTbl>{
            comment_id: model.commentId,
            parent_id: model.parentId,
            user_id: userId,
            comment: model.comment
        }
    }

}
