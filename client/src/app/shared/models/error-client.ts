import { ErrorTypes } from '@shared/enum'

export class ErrorClient extends Error {

    constructor(
        message: string,
        public errorType: ErrorTypes
    ) {
        super(message)
        // Object.setPrototypeOf(this, new.target.prototype)
        // Error.captureStackTrace(this)
    }

}
