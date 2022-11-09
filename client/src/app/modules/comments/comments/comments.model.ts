import { CommentItem } from '@dto'

export interface CommentItemUI extends CommentItem {
    commentReplies: Array<CommentItem>
}
