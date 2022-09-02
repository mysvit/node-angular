import { PictureDb, UserDb } from '@db'
import { Environment } from '@env'
import { Logger } from '@shared'

export class Core {

    userDb = new UserDb(this.env)
    pictureDb = new PictureDb(this.env)
    logger = new Logger(this.env)

    constructor(public env: Environment) {
    }

}
