import { PictureDb, UserDb, UserLogDb, CommentDb } from '@db'
import { Environment } from '@env'
import { Logger } from '@shared'

export class Core {

    userDb = new UserDb(this.env)
    pictureDb = new PictureDb(this.env)
    userLogDb = new UserLogDb(this.env)
    commentDb = new CommentDb(this.env)

    logger = new Logger(this.env)

    constructor(public env: Environment) {
    }

}
