import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { picturesCore } from '../../ref/db-pools-core'

export class PicturesApi {

    static async add(req: Request, res: Response) {
        const result = await picturesCore.add(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async upd(req: Request, res: Response) {
        const result = await picturesCore.upd(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async get(req: Request, res: Response) {
        const result = await picturesCore.get(req.params?.id)
        res.header('Cross-Origin-Resource-Policy', 'cross-origin')
        res.send(result.content)
    }

}
