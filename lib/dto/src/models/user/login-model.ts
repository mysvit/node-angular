export class LoginModel {

    email: string
    password: string

    constructor(obj: LoginModel) {
        this.email = obj?.email?.trim()
        this.password = obj?.password?.trim()
    }

}
