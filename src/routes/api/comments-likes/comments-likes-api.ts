import { ParamsHelper } from '@shared'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { commentsLikesCore } from '../../ref/db-pools-core'

export class CommentsLikesApi {

    static async list(req: Request, res: Response) {
        const result = await commentsLikesCore.list(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

}
