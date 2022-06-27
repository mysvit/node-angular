import { DbUser } from '@db/db.js'
import { Environment } from '@shared/shared.js'

export class CoreBase {

    dbUser = new DbUser(this.environment)

    constructor(public environment: Environment) {
    }

}