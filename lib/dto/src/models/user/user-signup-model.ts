import { PictureModel } from '../picture'

export class UserSignupModel {
    email: string
    nickname: string
    password: string
    avatar: PictureModel

    constructor(obj: any) {
        this.nickname = obj?.nickname?.trim()
        this.email = obj?.email?.trim()
        this.password = obj?.password?.trim()
        this.avatar = obj?.avatar
    }
}
