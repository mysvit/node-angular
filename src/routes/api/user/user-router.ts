import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { UserApi } from './user-api'

// Router
export const userRouter = express.Router()

// apiBase/user/getById?[query]
// user_id: uuid
userRouter.get(ApiPath.user_getById, ErrorHandler.apiCatch(UserApi.getById))
// apiBase/user/signup
// [form]
// user: User
userRouter.post(ApiPath.user_signup, ErrorHandler.apiCatch(UserApi.signup))
// apiBase/user/login
// [form]
// model: LoginModel
userRouter.post(ApiPath.user_login, ErrorHandler.apiCatch(UserApi.login))
