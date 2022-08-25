import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { UserApi } from './user-api'

// Router
export const userBase = express.Router()
export const userAuth = express.Router()
export const userProf = express.Router()

// api/user/signup
// [form]
// user: User
userBase.post(ApiPath.user_signup, ErrorHandler.apiCatch(UserApi.signup))

// api/user/user_verify/:user_id
// [form]
// user_id: uuid
// confirm_code: 12345
userBase.put(ApiPath.user_verify, ErrorHandler.apiCatch(UserApi.verify))

// api/user/login
// [form]
// model: LoginModel
userBase.post(ApiPath.user_login, ErrorHandler.apiCatch(UserApi.login))

// api/user/auth
// check if token not expired, middleware do a job
userAuth.get(ApiPath.user_auth, ErrorHandler.apiCatch(UserApi.isAuth))

// api/user/get_profile_short/:user_id
// user_id: uuid
// userProf.get(ApiPath.user_get_profile_short, ErrorHandler.apiCatch(UserApi.getProfileShort))
