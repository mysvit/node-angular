import { Environment } from '@env'
import { Logger } from '@shared'
import { Pool } from 'mariadb'

export class Core {

    constructor(
        public env: Environment,
        public logger: Logger,
        public pool: Pool) {
    }

}
