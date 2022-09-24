import { environment } from '@env'
import { ApiParams, ErrorsMsg, ValueHelper } from '@shared'
import { randomBytes } from 'crypto'
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

const {verify} = jwt

export namespace Middleware {

    export function verifyToken(req: Request, res: Response, next: NextFunction) {
        // verify token and user_id
        const userId = req.headers[ApiParams.user_id]
        const token = (<string>(req.headers[ApiParams.authorization] || '')).replace('Bearer ', '')
        if (ValueHelper.isEmpty(token) || ValueHelper.isEmpty(userId)) {
            return res.status(StatusCodes.FORBIDDEN).send({message: ErrorsMsg.TokenRequired})
        }
        try {
            const verifyResult = verify(token, environment.token_key)
            if (userId !== verifyResult.user_id) {
                return res.status(StatusCodes.UNAUTHORIZED).send({message: ErrorsMsg.InvalidToken})
            }
        } catch (err) {
            return res.status(StatusCodes.UNAUTHORIZED).send({message: ErrorsMsg.InvalidToken})
        }
        next()
    }

    export function updateEnvironmentTokenKey() {
        if (environment.production) {
            environment.token_key = randomBytes(32).toString('hex')
        }
    }

}
