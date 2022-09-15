import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userProfileCore } from '../../ref/core'

// apiUrl+/user/get
export class UserProfileApi {

    static async getUserProfile(req: Request, res: Response) {
        const result = await userProfileCore.getUserProfile(req.params?.user_id)
        res.status(StatusCodes.OK).json(result)
    }

    static async updateProfilePicture(req: Request, res: Response) {
        const result = await userProfileCore.updatePictureProfile(req.params?.user_id, req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async updatePublicProfile(req: Request, res: Response) {
        const result = await userProfileCore.updatePublicProfile(req.params?.user_id, req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async modifyEmail(req: Request, res: Response) {
        const result = await userProfileCore.modifyEmail(req.params?.user_id, req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async verifyNewEmail(req: Request, res: Response) {
        const result = await userProfileCore.verifyNewEmail(req.socket.remoteAddress, req.params?.user_id, req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async changePassword(req: Request, res: Response) {
        const result = await userProfileCore.changePassword(req.socket.remoteAddress, req.params?.user_id, req.body)
        res.status(StatusCodes.OK).json(result)
    }

}
