export class Storage {
    static get user() {
        return localStorage.getItem(StorageItems.user) ?? ''
    }

    static set user(value: string) {
        localStorage.setItem(StorageItems.user, value)
    }

    static get token() {
        return localStorage.getItem(StorageItems.token) ?? ''
    }

    static set token(value: string) {
        localStorage.setItem(StorageItems.token, value)
    }

    removeItem(item: StorageItems) {
        localStorage.removeItem(item)
    }
}

export enum StorageItems {
    user = 'user',
    token = 'token'
}
