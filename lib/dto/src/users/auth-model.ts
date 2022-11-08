import { AuthType } from '../db-types'

export interface AuthModel {
    userId: string
    email: string
    nickname: string
    avatarId: string
    token: string
    authType: AuthType
}
