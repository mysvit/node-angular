import { UserDb } from '@db'
import { Environment } from '@env'

export class Core {

    dbUser = new UserDb(this.environment)

    constructor(public environment: Environment) {
    }

}