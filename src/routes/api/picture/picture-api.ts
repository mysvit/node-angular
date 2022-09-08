import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { pictureCore } from '../../ref/core'

export class PictureApi {

    static async add(req: Request, res: Response) {
        const result = await pictureCore.add(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async upd(req: Request, res: Response) {
        const result = await pictureCore.upd(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async get(req: Request, res: Response) {
        const result = await pictureCore.get(req.params?.picture_id)
        res.header('Cross-Origin-Resource-Policy', 'cross-origin')
        res.send(result.content)
    }

}
