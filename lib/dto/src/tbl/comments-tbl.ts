export interface CommentsTbl {
    comment_id: string
    is_del: number
    user_id: string
    write_date: Date
    comment: string
    likes_count: number
    dislikes_count: number
    replies_count: number
}
