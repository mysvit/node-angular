import * as express from 'express'
import { userAuth, userProf } from './api/user'
import { ErrorHandler } from './errors'
import { Middleware } from './middleware'

export const routes = express.Router()

// Api
routes.use('/', userAuth)

// Authenticated
routes.use(Middleware.verifyToken)
// user profile
routes.use('/', userProf)
// 404 for authenticated path
routes.use(ErrorHandler.api404)

// Wire up error-handling middleware with 4 parameters
routes.use(ErrorHandler.apiHandler)
