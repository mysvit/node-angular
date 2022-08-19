import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { pictureCore } from '../../ref/core'

export class PictureApi {

    static async add(req: Request, res: Response) {
        const result = await pictureCore.add(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async update(req: Request, res: Response) {
        const result = await pictureCore.update(req.body)
        res.status(StatusCodes.OK).json(result)
    }

}
