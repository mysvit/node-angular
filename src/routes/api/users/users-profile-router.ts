import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { UsersProfileApi } from './users-profile-api'

// Router
export const userProf = express.Router()

// api/user/get-profile/:user_id
// user_id: uuid
userProf.get(ApiPath.users_get_profile, ErrorHandler.apiCatch(UsersProfileApi.getUserProfile))

// api/user/upd-profile-picture/:user_id
// user_id: uuid
userProf.put(ApiPath.users_upd_picture_profile, ErrorHandler.apiCatch(UsersProfileApi.updateProfilePicture))

// api/user/user-upd-public-profile/:user_id
// user_id: uuid
userProf.put(ApiPath.users_upd_public_profile, ErrorHandler.apiCatch(UsersProfileApi.updatePublicProfile))

// api/user/modify-email/:user_id
// user_id: uuid
userProf.put(ApiPath.users_modify_email, ErrorHandler.apiCatch(UsersProfileApi.modifyEmail))

// api/user/verify-new-email/:user_id
// user_id: uuid
userProf.put(ApiPath.users_verify_new_email, ErrorHandler.apiCatch(UsersProfileApi.verifyNewEmail))

// api/user/change-password/:user_id
// user_id: uuid
userProf.put(ApiPath.users_change_password, ErrorHandler.apiCatch(UsersProfileApi.changePassword))
