import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userCore } from '../../core-lib.js'

// apiUrl+/user/get
export class UserApi {

    static async getById(req: Request, res: Response) {
        const result = await userCore.getById(req.query)
        res.status(StatusCodes.OK).json(result)
    }

    static async add(req: Request, res: Response) {
        const result = await userCore.add(req.body)
        res.status(StatusCodes.OK).json(result)
    }

}