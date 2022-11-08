import { ParamsHelper } from '@shared'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { usersProfileCore } from '../../ref/db-pools-core'

// apiUrl+/user/get
export class UsersProfileApi {

    static async getUserProfile(req: Request, res: Response) {
        const result = await usersProfileCore.getUserProfile(ParamsHelper.getUserId(req.headers))
        res.status(StatusCodes.OK).json(result)
    }

    static async updateProfilePicture(req: Request, res: Response) {
        const result = await usersProfileCore.updatePictureProfile(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async updatePublicProfile(req: Request, res: Response) {
        const result = await usersProfileCore.updatePublicProfile(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async modifyEmail(req: Request, res: Response) {
        const result = await usersProfileCore.modifyEmail(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async verifyNewEmail(req: Request, res: Response) {
        const result = await usersProfileCore.verifyNewEmail(ParamsHelper.getUserId(req.headers), req.body, req.socket.remoteAddress)
        res.status(StatusCodes.OK).json(result)
    }

    static async changePassword(req: Request, res: Response) {
        const result = await usersProfileCore.changePassword(ParamsHelper.getUserId(req.headers), req.body, req.socket.remoteAddress)
        res.status(StatusCodes.OK).json(result)
    }

}
