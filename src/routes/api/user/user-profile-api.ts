import { ParamsHelper } from '@shared'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userProfileCore } from '../../ref/core'

// apiUrl+/user/get
export class UserProfileApi {

    static async getUserProfile(req: Request, res: Response) {
        const result = await userProfileCore.getUserProfile(ParamsHelper.getUserId(req.headers))
        res.status(StatusCodes.OK).json(result)
    }

    static async updateProfilePicture(req: Request, res: Response) {
        const result = await userProfileCore.updatePictureProfile(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async updatePublicProfile(req: Request, res: Response) {
        const result = await userProfileCore.updatePublicProfile(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async modifyEmail(req: Request, res: Response) {
        const result = await userProfileCore.modifyEmail(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async verifyNewEmail(req: Request, res: Response) {
        const result = await userProfileCore.verifyNewEmail(ParamsHelper.getUserId(req.headers), req.body, req.socket.remoteAddress)
        res.status(StatusCodes.OK).json(result)
    }

    static async changePassword(req: Request, res: Response) {
        const result = await userProfileCore.changePassword(ParamsHelper.getUserId(req.headers), req.body, req.socket.remoteAddress)
        res.status(StatusCodes.OK).json(result)
    }

}
