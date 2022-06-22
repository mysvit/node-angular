import { StatusCodes } from 'http-status-codes'

export class BaseError extends Error {

    public readonly name: string
    public readonly statusCode: StatusCodes
    public readonly isOperational: boolean

    constructor(name: string,
                statusCode: number,
                isOperational: boolean,
                message: string) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}