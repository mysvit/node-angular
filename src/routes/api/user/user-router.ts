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
// api/user/login
// [form]
// model: LoginModel
userBase.post(ApiPath.user_login, ErrorHandler.apiCatch(UserApi.login))

// api/user/auth
// check if token not expired
userAuth.get(ApiPath.auth, ErrorHandler.apiCatch(UserApi.isAuth))

// api/user/getProfile?[query]
// userId: uuid
userProf.get(ApiPath.user_get_profile_short, ErrorHandler.apiCatch(UserApi.getProfileShort))
