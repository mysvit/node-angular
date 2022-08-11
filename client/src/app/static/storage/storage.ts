import { Props } from '@shared-lib/constants'

export class Storage {

    static get username() {
        return localStorage.getItem(Props.username) ?? ''
    }

    static set username(value: string) {
        localStorage.setItem(Props.username, value)
    }

    static get userId() {
        return localStorage.getItem(Props.userId) ?? ''
    }

    static set userId(value: string) {
        localStorage.setItem(Props.userId, value)
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
