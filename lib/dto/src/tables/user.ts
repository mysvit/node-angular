export interface UserBase {
    user_id: string
    user_name: string
    user_email: string
}

export interface UserAuth extends UserBase {
    user_hash: string
    user_salt: string
}

export class User implements UserAuth {

    user_id: string
    user_name: string
    user_email: string
    user_hash: string
    user_salt: string

    constructor(obj: UserAuth) {
        this.user_id = obj?.user_id
        this.user_name = obj?.user_name?.trim()
        this.user_email = obj?.user_email?.trim()
        this.user_hash = obj?.user_hash
        this.user_salt = obj?.user_salt
    }

    get updateArr() {
        return [this.user_name, this.user_email, this.user_hash, this.user_id]
    }

    get addArr() {
        return [this.user_id, this.user_name, this.user_email, this.user_hash, this.user_salt]
    }

}
