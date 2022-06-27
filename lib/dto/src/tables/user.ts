export interface IUser {
    user_id: string
    user_name: string
    user_email: string
    user_pass: string
}

export class User implements IUser {

    user_id: string
    user_name: string
    user_email: string
    user_pass: string

    constructor(obj) {
        this.user_id = obj?.user_id
        this.user_name = obj?.user_name?.trim()
        this.user_email = obj?.user_email?.trim()
        this.user_pass = obj?.user_pass
    }

    get updateArr() {
        return [this.user_name, this.user_email, this.user_pass, this.user_id]
    }

    get addArr() {
        return [this.user_id, this.user_name, this.user_email, this.user_pass]
    }

}