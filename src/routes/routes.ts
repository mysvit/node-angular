import * as express from 'express'
import { commentRouter } from './api/comment'
import { pictureRouter, pictureUrlRouter } from './api/picture'
import { userAuth, userBase, userProf } from './api/user'
import { ErrorHandler } from './errors'
import { Middleware } from './middleware'

export const routes = express.Router()

// Api without auth
routes.use('/', userBase)
// picture url
routes.use('/', pictureUrlRouter)

// Authenticated
routes.use(Middleware.verifyToken)

// user Auth
routes.use('/', userAuth)
// user Profile
routes.use('/', userProf)
// user Picture
routes.use('/', pictureRouter)
// user Comment
routes.use('/', commentRouter)


// 404 for authenticated path
routes.use(ErrorHandler.api404)
// Wire up error-handling middleware with 4 parameters
routes.use(ErrorHandler.apiHandler)
