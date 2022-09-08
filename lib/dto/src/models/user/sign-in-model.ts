export class SignInModel {

    email: string
    password: string

    constructor(obj: SignInModel) {
        this.email = obj?.email?.trim()
        this.password = obj?.password?.trim()
    }

}
