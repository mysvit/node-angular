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

    static async isAuth(req: Request, res: Response) {
        res.status(StatusCodes.OK).send()
    }

    // static async getProfileShort(req: Request, res: Response) {
    //     const result = await userCore.getProfileShort(req.params?.user_id)
    //     res.status(StatusCodes.OK).json(result)
    // }
    //
    // static async confirmUser(req: Request, res: Response) {
    //     const result = await userCore.confirmUser(req.params?.user_id, req.params?.confirm_code)
    //     res.status(StatusCodes.OK).json(result)
    // }

}
