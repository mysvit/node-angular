import { PictureDb, UserDb } from '@db'
import { Environment } from '@env'

export class Core {

    userDb = new UserDb(this.env)
    pictureDb = new PictureDb(this.env)

    constructor(public env: Environment) {
    }

}
