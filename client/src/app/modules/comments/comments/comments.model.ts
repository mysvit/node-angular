import { CommentItem } from '@dto'

export interface CommentItemUI extends CommentItem {
    commentRepliesLoading: boolean
    isRepliesShowed: boolean
    newReply: CommentItem
    commentReplies: Array<CommentItem>
}
