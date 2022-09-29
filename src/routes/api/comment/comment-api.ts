import { ParamsHelper } from '@shared'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { commentCore } from '../../ref/core'

export class CommentApi {

    static async add(req: Request, res: Response) {
        const result = await commentCore.add(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async upd(req: Request, res: Response) {
        const result = await commentCore.upd(req.body)
        res.status(StatusCodes.OK).json(result)
    }

    static async get(req: Request, res: Response) {
        const result = await commentCore.get(req.params?.id)
        res.send(result)
    }

}
