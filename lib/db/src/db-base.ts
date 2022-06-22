import { Environment } from '@shared/config/environment.js'

export * from './tables/user/index.js'

export class DbBase {
    constructor(public env: Environment) {
    }
}