import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import { BaseError } from '../../../dist/routes/errors/base-error.js'
import { environment } from '../../environments/environment.js'
import { logger } from '../../logger.js'

export class ErrorHandler {

    // log error and send them if needed
    static async baseHandle(error: Error): Promise<void> {
        await logger.error('Error-handling:', error)
        // await sendMailToAdminIfCritical()
        // await sendEventsToSentry()
    }

    // api error handler middleware
    static async apiHandler(err: BaseError, req: Request, res: Response, next: NextFunction) {
        err.errorId = randomUUID()
        await ErrorHandler.baseHandle(err)
        if (ErrorHandler.isOperational(err)) {
            res.status(err.statusCode)
            res.json([{message: err.message}])
        } else {
            const message = 'Unknown error, see server log'
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            res.send(environment.production
                ? {message: message, errorId: err.errorId}
                : {message: message, stack: err.stack}
            )
        }
    }

    // check if error Operational
    static isOperational(error: Error) {
        if (error instanceof BaseError) {
            return error.isOperational
        }
        return false
    }

}