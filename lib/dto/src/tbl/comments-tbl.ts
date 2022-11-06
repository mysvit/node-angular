export interface CommentsTbl {
    comment_id: string
    parent_id: string
    is_del: number
    user_id: string
    add_date: Date
    comment: string
    likes_count: number
    dislikes_count: number
    replies_count: number
}
