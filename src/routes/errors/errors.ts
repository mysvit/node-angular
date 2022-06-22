// Handle any errors that come up
import { NextFunction, Request, Response } from "express"
import { logger } from '../../logger.js'
import { BaseError } from './base-error.js'

export function logError(err) {
    logger.error(err)
}

export function logErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    logError(err)
    next(err)
}

export function isOperationalError(error: BaseError) {
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

export async function errorHandle(err: BaseError, req: Request, res: Response, next: NextFunction) {
    if (isOperationalError(err)) {
        logErrorMiddleware(err, req, res, next)
    }
    next(err)
}