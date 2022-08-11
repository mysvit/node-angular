import { Params } from '@shared-lib/constants'

export class Storage {

    static get username() {
        return localStorage.getItem(Params.username) ?? ''
    }

    static set username(value: string) {
        localStorage.setItem(Params.username, value)
    }

    static get user_id() {
        return localStorage.getItem(Params.user_id) ?? ''
    }

    static set user_id(value: string) {
        localStorage.setItem(Params.user_id, value)
    }

    static get token() {
        return localStorage.getItem(Params.token) ?? ''
    }

    static set token(value: string) {
        localStorage.setItem(Params.token, value)
    }

    static clear() {
        localStorage.clear()
    }

}
