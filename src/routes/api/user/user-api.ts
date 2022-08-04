import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userCore } from '../../ref/core'

// apiUrl+/user/get
export class UserApi {

    static async signup(req: Request, res: Response) {
        const result = await userCore.signup(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async login(req: Request, res: Response) {
        const result = await userCore.login(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async getProfileShort(req: Request, res: Response) {
        const result = await userCore.getProfileShort(req.query)
        res.status(StatusCodes.OK).json(result)
    }

}
