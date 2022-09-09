import * as express from 'express'
import { pictureRouter, pictureUrlRouter } from './api/picture'
import { userAuth, userBase, userProf } from './api/user'
import { ErrorHandler } from './errors'
import { Middleware } from './middleware'

export const routes = express.Router()

// Api
routes.use('/', userBase)
// picture url
routes.use('/', pictureUrlRouter)

// Authenticated
routes.use(Middleware.verifyToken)

// user Auth
routes.use('/', userAuth)
// user profile
routes.use('/', userProf)
// user Auth
routes.use('/', pictureRouter)


// 404 for authenticated path
routes.use(ErrorHandler.api404)
// Wire up error-handling middleware with 4 parameters
routes.use(ErrorHandler.apiHandler)
