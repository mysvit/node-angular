import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { PictureApi } from './picture-api'

// Router
export const pictureUrlRouter = express.Router()
export const pictureRouter = express.Router()

// api/picture/get/:picture_id
pictureUrlRouter.get(ApiPath.picture_get, ErrorHandler.apiCatch(PictureApi.get))

// api/picture/add
// [form]
// picture: Picture
pictureRouter.post(ApiPath.picture_add, ErrorHandler.apiCatch(PictureApi.add))
// api/picture/update
// [form]
// picture: Picture
pictureRouter.post(ApiPath.picture_update, ErrorHandler.apiCatch(PictureApi.update))
