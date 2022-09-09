import { ApiParams } from '@shared-lib/constants'

export class SlStorage {

    static get isAuth(): boolean {
        return localStorage.getItem(ApiParams.is_auth) === '1'
    }

    static set isAuth(value: boolean) {
        localStorage.setItem(ApiParams.is_auth, value ? '1' : '0')
    }

    static get token() {
        return localStorage.getItem(ApiParams.token) ?? ''
    }

    static set token(value: string) {
        localStorage.setItem(ApiParams.token, value)
    }

    static get user_id() {
        return localStorage.getItem(ApiParams.user_id) ?? ''
    }

    static set user_id(value: string) {
        localStorage.setItem(ApiParams.user_id, value)
    }

    static get email(): string {
        return localStorage.getItem(ApiParams.email) ?? ''
    }

    static set email(value: string) {
        localStorage.setItem(ApiParams.email, value)
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

    static remove(name: string) {
        localStorage.removeItem(name)
    }

    static clear() {
        localStorage.clear()
    }

}
