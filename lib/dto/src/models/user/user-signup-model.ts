export class UserSignupModel {
    email: string
    nickname: string
    password: string

    constructor(obj: any) {
        this.nickname = obj?.nickname?.trim()
        this.email = obj?.email?.trim()
        this.password = obj?.password?.trim()
    }

}
