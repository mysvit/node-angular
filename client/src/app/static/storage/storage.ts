export class Storage {
    static get user_id() {
        return localStorage.getItem(StorageItems.user_id) ?? ''
    }

    static set user_id(value: string) {
        localStorage.setItem(StorageItems.user_id, value)
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
    user_id = 'user_id',
    token = 'token'
}
