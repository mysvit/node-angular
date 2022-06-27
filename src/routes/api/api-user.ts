import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { coreUser } from '../core-lib.js'
import { ApiValidation } from './api-validation.js'

// apiUrl+/user/get
export class ApiUser {

    static async getById(req: Request, res: Response, next: NextFunction) {
        ApiValidation.validateId(<string>req.query.user_id)
        await coreUser.getById(<string>req.query.user_id)
            .then(data => res.status(StatusCodes.OK).json(data))
    }

}