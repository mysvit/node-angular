import { Props } from '@shared-lib/constants'

export class Storage {

    static get username() {
        return localStorage.getItem(Props.username) ?? ''
    }

    static set username(value: string) {
        localStorage.setItem(Props.username, value)
    }

    static get user_id() {
        return localStorage.getItem(Props.user_id) ?? ''
    }

    static set user_id(value: string) {
        localStorage.setItem(Props.user_id, value)
    }

    static get token() {
        return localStorage.getItem(Props.token) ?? ''
    }

    static set token(value: string) {
        localStorage.setItem(Props.token, value)
    }

    static clear() {
        localStorage.clear()
    }

}
