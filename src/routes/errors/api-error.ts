import { StatusCodes } from 'http-status-codes'
import { BaseError } from './base-error.js'

export class Api400Error extends BaseError {
    constructor(message) {
        super('Bad request', StatusCodes.BAD_REQUEST, true, message)
    }
}

export class Api404Error extends BaseError {
    constructor(message) {
        super('Not found', StatusCodes.NOT_FOUND, true, message)
    }
}

export class Api500Error extends BaseError {
    constructor(message) {
        super('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR, true, message)
    }
}