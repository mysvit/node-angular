import { ValueHelper } from '../helpers'

export namespace Validation {

    // check if this is uuid
    export function isUUIDValid(uuid: string, withDash: boolean = true): boolean {
        return withDash ? (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(uuid)
            : (/^[0-9a-f]{8}[0-9a-f]{4}[0-5][0-9a-f]{3}[089ab][0-9a-f]{3}[0-9a-f]{12}$/i).test(uuid)
    }

    // Minimum eight characters, at least one letter and one number:
    export function isPasswordValid(password: string): boolean {
        return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(password)
    }

    // email address
    export function isEmailValid(email: string): boolean {
        return (/^(([^<>()[\]+.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g).test(email)
    }

    // username
    export function isUsernameValid(username: string): boolean {
        return (/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/).test(username)
    }

    // nickname
    export function isNicknameValid(nickname: string): boolean {
        return (/^(?=[a-zA-Z0-9._ ]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/).test(nickname)
    }

    // all property required
    export function isAllPropertyHaveValues(obj: Object): boolean {
        return Object.getOwnPropertyNames(obj)
            .map(fieldName => ValueHelper.isEmpty(obj[fieldName]))
            .findIndex(value => value) < 0
    }

    export function isVerificationCodeValid(code: string): boolean {
        return (/^[0-9]{5}$/).test(code)
    }

}
