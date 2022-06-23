import { User } from '@core/core.js'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { environment } from '../../environments/environment.js'
import { getValidId } from '../../helper/validation.js'
import { apiCatch } from './api-base.js'

// apiUrl+/user/get
export const apiUserGet: RequestHandler = apiCatch(async (req: Request, res: Response, next: NextFunction) => {
    // const user_id = getValidId(randomUUID())
    const user_id = getValidId(req.query.user_id)
    res.status(StatusCodes.OK)
    res.json(await new User(environment).getById(user_id))
})