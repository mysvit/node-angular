export class UserTbl {

    user_id: string
    is_del: number
    nickname: string
    email: string
    signup_date: Date
    modify_date: Date
    login_date: Date
    is_confirmed: number
    confirm_code: string
    pre_confirmed_hash: string
    password_hash: string
    password_salt: string
    avatar_id: string

    constructor(obj: any) {
        this.user_id = obj?.user_id
        this.is_del = obj?.is_del
        this.nickname = obj?.nickname
        this.email = obj?.email
        this.signup_date = obj?.signup_date
        this.modify_date = obj?.modify_date
        this.login_date = obj?.login_date
        this.is_confirmed = obj?.is_confirmed
        this.confirm_code = obj?.confirm_code
        this.pre_confirmed_hash = obj?.pre_confirmed_hash
        this.password_hash = obj?.password_hash
        this.password_salt = obj?.password_salt
        this.avatar_id =  obj?.avatar_id
    }

    get signupArr() {
        return [this.user_id, this.signup_date, this.email, this.nickname, this.confirm_code, this.password_hash, this.password_salt]
    }

    get updateSet() {
        return [this.user_id, this.signup_date, this.email, this.nickname, this.confirm_code, this.password_hash, this.password_salt]
    }

    get updateArr() {
        return [this.user_id, this.signup_date, this.email, this.nickname, this.confirm_code, this.password_hash, this.password_salt]
    }

}
