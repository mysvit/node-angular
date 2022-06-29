import { UserDb } from '@db/index.js'
import { Environment } from '@shared/index.js'

export class Core {

    dbUser = new UserDb(this.environment)

    constructor(public environment: Environment) {
    }

}