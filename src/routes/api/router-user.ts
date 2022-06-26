import * as express from 'express'
import { ErrorHandler } from '../errors/error-handler.js'
import { ApiUser } from './api-user.js'

// Router
export const routerUser = express.Router()

// apiUrl+/user/get
routerUser.get('/user/get', ErrorHandler.apiCatch(ApiUser.getById))
