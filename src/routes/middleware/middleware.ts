import { environment } from '@env'
import { randomBytes } from 'crypto'
import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

const {verify} = jwt

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = (<string>(req.headers['authorization'] ?? '')).replace('Bearer ', '')
    const user_id = req.headers['user_id']
    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        const verify_result = verify(token, environment.token_key)
        if (user_id !== verify_result.user_id) {
            return res.status(401).send("Invalid Token")
        }
    } catch (err) {
        return res.status(401).send("Invalid Token")
    }
    next()
}

export function updateEnvironmentTokenKey() {
    if (environment.production) {
        environment.token_key = randomBytes(32).toString('hex')
    }
}
