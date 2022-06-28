import * as express from 'express'
import { ErrorHandler } from '../errors/error-handler.js'
import { ApiUser } from './api-user.js'

// Router
export const routerUser = express.Router()

// apiBase/user/getById?[query]
// user_id: uuid
routerUser.get('/user/getById', ErrorHandler.apiCatch(ApiUser.getById))
// apiBase/user/add
// [form]
// user: User
routerUser.post('/user/add', ErrorHandler.apiCatch(ApiUser.add))