import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userCore } from '../../ref/core'

// apiUrl+/user/get
export class UserApi {

    static async signup(req: Request, res: Response) {
        const result = await userCore.signup(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async signIn(req: Request, res: Response) {
        const result = await userCore.signIn(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async isAuth(req: Request, res: Response) {
        res.status(StatusCodes.OK).send()
    }

    static async verifyCode(req: Request, res: Response) {
        const result = await userCore.verifyCode(req.params?.user_id, req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async resendCode(req: Request, res: Response) {
        const result = await userCore.resendCode(req.params?.user_id)
        res.status(StatusCodes.OK).json(result)
    }

    static async forgotPass(req: Request, res: Response) {
        const result = await userCore.forgotPass(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async resetPass(req: Request, res: Response) {
        const result = await userCore.resetPass(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async getUserProfile(req: Request, res: Response) {
        const result = await userCore.getUserProfile(req.params?.user_id)
        res.status(StatusCodes.OK).json(result)
    }

}
