export interface UserSecurityInfoModel {
    user_id: string
    password_hash: string
    password_salt: string
    is_confirmed: number
}
