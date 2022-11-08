import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { UsersApi } from './users-api'

// Router
export const userBase = express.Router()
export const userAuth = express.Router()

// api/user/signup
// [form]
// user: User
userBase.post(ApiPath.users_signup, ErrorHandler.apiCatch(UsersApi.signup))

// api/user/verify-code/:user_id
// user_id: uuid
// [form]
// confirm_code: 12345
userBase.put(ApiPath.users_verify_code, ErrorHandler.apiCatch(UsersApi.verifyCode))

// api/user/resend-code/:user_id
// user_id: uuid
userBase.put(ApiPath.users_resend_code, ErrorHandler.apiCatch(UsersApi.resendCode))

// api/user/forgot-pass
// [form]
// model: EmailModel
userBase.post(ApiPath.users_forgot_pass, ErrorHandler.apiCatch(UsersApi.forgotPass))

// api/user/reset-pass
// [form]
// model: ResetPassModel
userBase.post(ApiPath.users_reset_pass, ErrorHandler.apiCatch(UsersApi.resetPass))

// api/user/sign-in
// [form]
// model: SignInModel
userBase.post(ApiPath.users_sign_in, ErrorHandler.apiCatch(UsersApi.signIn))

// api/user/auth
// check if token not expired, middleware do a job
userAuth.get(ApiPath.users_auth, ErrorHandler.apiCatch(UsersApi.isAuth))
