import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { UserApi } from './user-api'

// Router
export const userAuth = express.Router()
export const userProf = express.Router()

// apiBase/user/signup
// [form]
// user: User
userAuth.post(ApiPath.user_signup, ErrorHandler.apiCatch(UserApi.signup))
// apiBase/user/login
// [form]
// model: LoginModel
userAuth.post(ApiPath.user_login, ErrorHandler.apiCatch(UserApi.login))


// apiBase/user/getProfile?[query]
// user_id: uuid
userProf.get(ApiPath.user_getProfileShort, ErrorHandler.apiCatch(UserApi.getProfileShort))
