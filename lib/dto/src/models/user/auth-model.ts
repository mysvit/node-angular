import { AuthType } from '../../enum'

export interface AuthModel {
    user_id: string
    token: string
    authType: AuthType
}
