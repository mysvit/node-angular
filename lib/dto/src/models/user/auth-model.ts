import { AuthType } from '../../enum'

export interface AuthModel {
    userId: string
    email: string
    nickname: string
    avatarId: string
    token: string
    authType: AuthType
}
