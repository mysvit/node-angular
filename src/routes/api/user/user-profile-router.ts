import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { UserProfileApi } from './user-profile-api'

// Router
export const userProf = express.Router()

// api/user/get-profile/:user_id
// user_id: uuid
userProf.get(ApiPath.user_get_profile, ErrorHandler.apiCatch(UserProfileApi.getUserProfile))

// api/user/upd-profile-picture/:user_id
// user_id: uuid
userProf.put(ApiPath.user_upd_picture_profile, ErrorHandler.apiCatch(UserProfileApi.updateProfilePicture))

// api/user/user-upd-public-profile/:user_id
// user_id: uuid
userProf.put(ApiPath.user_upd_public_profile, ErrorHandler.apiCatch(UserProfileApi.updatePublicProfile))

// api/user/modify-email/:user_id
// user_id: uuid
userProf.put(ApiPath.user_modify_email, ErrorHandler.apiCatch(UserProfileApi.modifyEmail))

// api/user/verify-new-email/:user_id
// user_id: uuid
userProf.put(ApiPath.user_verify_new_email, ErrorHandler.apiCatch(UserProfileApi.verifyNewEmail))
