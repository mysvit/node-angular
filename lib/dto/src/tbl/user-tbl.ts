export interface UserTbl {
    user_id: string
    is_del: number
    nickname: string
    email: string
    signup_date: Date
    modify_date: Date
    sign_in_date: Date
    is_verified: number
    verification_code: string
    pre_verified_hash: string
    password_hash: string
    password_salt: string
    avatar_id: string
    forgot_pass_count: number
    forgot_pass_date: Date
    reset_pass_count: number
    reset_pass_date: Date
    reset_pass_code: string
    new_email: string
    new_email_verification_code: string
}
