import { User } from '@core/core.js'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { environment } from '../../environments/environment.js'
import { getValidId } from '../../helper/validation.js'

// apiUrl+/user/get
export async function apiUserGet(req: Request, res: Response, next: NextFunction) {
    try {
        const user_id = getValidId(req.query.user_id)
        const user = new User(environment)
        user.getById(user_id)
            .then(data => res.status(StatusCodes.OK).json(data))
            .catch((error: Error) => next(error))
    } catch (error) {
        next(error)
    }
}
