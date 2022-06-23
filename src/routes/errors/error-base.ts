import { StatusCodes } from 'http-status-codes'

export class ErrorBase extends Error {

    public readonly name: string
    public readonly statusCode: StatusCodes
    public readonly isOperational: boolean
    public errorId: string

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