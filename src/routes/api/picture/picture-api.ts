import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { pictureCore } from '../../ref/core'

export class PictureApi {

    static async create(req: Request, res: Response) {
        const result = await pictureCore.create(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async update(req: Request, res: Response) {
        const result = await pictureCore.update(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async read(req: Request, res: Response) {
        const result = await pictureCore.read(req.params?.picture_id)
        res.header('Cross-Origin-Resource-Policy', 'cross-origin')
        res.send(result.content)
    }

}
