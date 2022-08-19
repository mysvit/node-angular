export class UserSignupModel {

    user_id: string
    username: string
    email: string
    password_hash: string
    password_salt: string

    constructor(obj: any) {
        this.user_id = obj?.user_id
        this.username = obj?.username?.trim()
        this.email = obj?.email?.trim()
        this.password_hash = obj?.password_hash
        this.password_salt = obj?.password_salt
    }

    get signupArr() {
        return [this.user_id, this.username, this.email, this.password_hash, this.password_salt]
    }

}
