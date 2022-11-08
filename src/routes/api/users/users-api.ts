import { ParamsHelper } from '@shared'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { usersCore } from '../../ref/db-pools-core'

// apiUrl+/user/get
export class UsersApi {

    static async signup(req: Request, res: Response) {
        const result = await usersCore.signup(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async signIn(req: Request, res: Response) {
        const result = await usersCore.signIn(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async isAuth(req: Request, res: Response) {
        res.status(StatusCodes.OK).send()
    }

    static async verifyCode(req: Request, res: Response) {
        const result = await usersCore.verifyCode(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async resendCode(req: Request, res: Response) {
        const result = await usersCore.resendCode(ParamsHelper.getUserId(req.headers))
        res.status(StatusCodes.OK).json(result)
    }

    static async forgotPass(req: Request, res: Response) {
        const result = await usersCore.forgotPass(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async resetPass(req: Request, res: Response) {
        const result = await usersCore.resetPass(req.body)
        res.status(StatusCodes.OK).json(result)
    }

}
