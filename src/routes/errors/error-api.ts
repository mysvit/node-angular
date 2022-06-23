import { StatusCodes } from 'http-status-codes'
import { ErrorBase } from './error-base.js'

export class errorApi400 extends ErrorBase {
    constructor(message) {
        super('Bad request', StatusCodes.BAD_REQUEST, true, message)
    }
}

export class errorApi404 extends ErrorBase {
    constructor(message) {
        super('Not found', StatusCodes.NOT_FOUND, true, message)
    }
}

export class errorApi500 extends ErrorBase {
    constructor(message) {
        super('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR, true, message)
    }
}