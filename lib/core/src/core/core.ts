import { PictureDb, UserDb } from '@db'
import { Environment } from '@env'

export class Core {

    userDb = new UserDb(this.environment)
    pictureDb = new PictureDb(this.environment)

    constructor(public environment: Environment) {
    }

}
