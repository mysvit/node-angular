import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { UserApi } from './user-api'

// Router
export const userRouter = express.Router()

// apiBase/user/getById?[query]
// user_id: uuid
userRouter.get('/user/getById', ErrorHandler.apiCatch(UserApi.getById))
// apiBase/user/add
// [form]
// user: User
userRouter.post('/user/signup', ErrorHandler.apiCatch(UserApi.signup))
