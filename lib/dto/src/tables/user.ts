export interface IUser {
    id: string
    name: string
}

export class User implements IUser {
    id: string
    name: string
    desc: string

    constructor(obj) {
        this.id = obj?.id
        this.name = obj?.name
        this.desc = obj?.desc
    }
}