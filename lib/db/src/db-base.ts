import { Environment } from '@shared/config/environment.js'
import { createPool } from 'mariadb'

export class DbBase {

    pool = createPool(this.environment.db)

    constructor(public environment: Environment) {
    }

}