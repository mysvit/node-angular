import { User } from '@core/core.js'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { environment } from '../../environments/environment.js'
import { getValidId } from '../../helper/validation.js'

// apiUrl+/user/get
export async function apiUserGet(req: Request, res: Response) {
    const user_id = getValidId(req.query.user_id)
    const user = new User(environment)
    res.status(StatusCodes.OK).json(await user.getById(user_id))
}
