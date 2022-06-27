import { randomUUID } from 'crypto'
import { NextFunction, Request, RequestHandler, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import { environment } from '../../environments/environment.js'
import { logger } from '../../logger.js'
import { ErrorBase } from '@shared/shared.js'

export class ErrorHandler {

    // log error and send them if needed
    static async baseHandle(error: Error): Promise<void> {
        await logger.error('Error-handling:', error)
        // await sendMailToAdminIfCritical()
        // await sendEventsToSentry()
    }

    // wrap all api method in try catch
    static apiCatch(fn: RequestHandler) {
        return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                await fn(req, res, next)
            } catch (error) {
                next(error)
            }
        }
    }

    // api error handler middleware
    static async apiHandler(err: ErrorBase, req: Request, res: Response, next: NextFunction) {
        err.errorId = randomUUID()
        await ErrorHandler.baseHandle(err)
        if (err.isOperational) {
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

    static api404(req: Request, res: Response) {
        res.status(StatusCodes.NOT_FOUND).send({message: `Route [${req.originalUrl}] not found.`})
    }

}