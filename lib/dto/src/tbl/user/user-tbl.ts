export interface UserTbl {
    user_id: string
    is_del: number
    nickname: string
    email: string
    signup_date: Date
    modify_date: Date
    login_date: Date
    is_verified: number
    verification_code: string
    pre_verified_hash: string
    password_hash: string
    password_salt: string
    avatar_id: string
    reset_pass_code: string
}
