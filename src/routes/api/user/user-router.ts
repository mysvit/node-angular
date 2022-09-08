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

// api/user/verify-code/:user_id
// user_id: uuid
// [form]
// confirm_code: 12345
userBase.put(ApiPath.user_verify_code, ErrorHandler.apiCatch(UserApi.verifyCode))

// api/user/resend-code/:user_id
// user_id: uuid
userBase.put(ApiPath.user_resend_code, ErrorHandler.apiCatch(UserApi.resendCode))

// api/user/forgot-pass
// [form]
// model: ForgotPassModel
userBase.post(ApiPath.user_forgot_pass, ErrorHandler.apiCatch(UserApi.forgotPass))

// api/user/reset-pass
// [form]
// model: ResetPassModel
userBase.post(ApiPath.user_reset_pass, ErrorHandler.apiCatch(UserApi.resetPass))

// api/user/sign-in
// [form]
// model: SignInModel
userBase.post(ApiPath.user_sign_in, ErrorHandler.apiCatch(UserApi.signIn))

// api/user/auth
// check if token not expired, middleware do a job
userAuth.get(ApiPath.user_auth, ErrorHandler.apiCatch(UserApi.isAuth))

// api/user/get_profile/:user_id
// user_id: uuid
userProf.get(ApiPath.user_get_profile, ErrorHandler.apiCatch(UserApi.getUserProfile))
