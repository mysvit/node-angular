import { CommentItem } from '@dto'

export interface CommentItemUI extends CommentItem {
    commentRepliesLoading: boolean
    commentReplies: Array<CommentItem>
}
