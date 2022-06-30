import { StatusCodes } from 'http-status-codes'
import { ErrorBase } from './error-base'

export class ErrorApi400 extends ErrorBase {
    constructor(message) {
        super('Bad request', StatusCodes.BAD_REQUEST, true, message)
    }
}

export class ErrorApi500 extends ErrorBase {
    constructor(message) {
        super('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR, true, message)
    }
}