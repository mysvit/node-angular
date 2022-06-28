import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { coreUser } from '../core-lib.js'

// apiUrl+/user/get
export class ApiUser {

    static async getById(req: Request, res: Response, next: NextFunction) {
        const result = await coreUser.getById(req.query)
        res.status(StatusCodes.OK).json(result)
    }

    static async add(req: Request, res: Response, next: NextFunction) {
        const result = await coreUser.add(req.body)
        res.status(StatusCodes.OK).json(result)
    }

}