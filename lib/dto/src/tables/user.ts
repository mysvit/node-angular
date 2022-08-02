export interface IUser {
    user_id: string
    user_name: string
    user_email: string
    user_hash: string
}

export class User implements IUser {

    user_id: string
    user_name: string
    user_email: string
    user_hash: string

    constructor(obj: IUser) {
        this.user_id = obj?.user_id
        this.user_name = obj?.user_name?.trim()
        this.user_email = obj?.user_email?.trim()
        this.user_hash = obj?.user_hash
    }

    get updateArr() {
        return [this.user_name, this.user_email, this.user_hash, this.user_id]
    }

    get addArr() {
        return [this.user_id, this.user_name, this.user_email, this.user_hash]
    }

}
