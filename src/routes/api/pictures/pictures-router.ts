import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { PicturesApi } from './pictures-api'

// Router
export const pictureUrlRouter = express.Router()
export const picturesRouter = express.Router()

// api/pictures/get/:id
pictureUrlRouter.get(ApiPath.pictures_get, ErrorHandler.apiCatch(PicturesApi.get))

// api/pictures/add
// [form]
// picture: Picture
picturesRouter.post(ApiPath.pictures_add, ErrorHandler.apiCatch(PicturesApi.add))

// api/pictures/upd
// [form]
// picture: Picture
picturesRouter.post(ApiPath.pictures_upd, ErrorHandler.apiCatch(PicturesApi.upd))
