import { ApiParams } from '@shared-lib/constants'

export class Storage {

    static get user_id() {
        return localStorage.getItem(ApiParams.user_id) ?? ''
    }

    static set user_id(value: string) {
        localStorage.setItem(ApiParams.user_id, value)
    }

    static get token() {
        return localStorage.getItem(ApiParams.token) ?? ''
    }

    static set token(value: string) {
        localStorage.setItem(ApiParams.token, value)
    }

    static get nickname(): string {
        return localStorage.getItem(ApiParams.nickname) ?? ''
    }

    static set nickname(value: string) {
        localStorage.setItem(ApiParams.nickname, value)
    }

    static get avatar_id() {
        return localStorage.getItem(ApiParams.avatar_id) ?? ''
    }

    static set avatar_id(value: string) {
        localStorage.setItem(ApiParams.avatar_id, value)
    }

    static clear() {
        localStorage.clear()
    }

}
