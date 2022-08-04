import { environment } from '@env'
import { ErrorsMsg, ValueHelper } from '@shared'
import { randomBytes } from 'crypto'
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

const {verify} = jwt

export namespace Middleware {

    export function verifyToken(req: Request, res: Response, next: NextFunction) {
        const user_id = req.headers['user_id']
        const token = (<string>(req.headers['authorization'] ?? '')).replace('Bearer ', '')
        if (ValueHelper.isEmpty(token) || ValueHelper.isEmpty(user_id)) {
            return res.status(StatusCodes.FORBIDDEN).send({message: ErrorsMsg.TokenRequired})
        }
        try {
            const verify_result = verify(token, environment.token_key)
            if (user_id !== verify_result.user_id) {
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
