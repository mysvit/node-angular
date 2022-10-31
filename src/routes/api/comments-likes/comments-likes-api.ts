import { ParamsHelper } from '@shared'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { commentsLikesCore } from '../../ref/db-pools-core'

export class CommentsLikesApi {

    static async set(req: Request, res: Response) {
        const result = await commentsLikesCore.set(ParamsHelper.getUserId(req.headers), req.body)
        res.status(StatusCodes.OK).json(result)
    }

}
