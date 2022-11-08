export interface CommentsLikesTbl {
    comment_like_id: string
    user_id: string
    comment_id: string
    write_date: Date
    is_like: number
    is_dislike: number
}
