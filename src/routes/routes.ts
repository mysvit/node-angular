import * as express from 'express'
import { userAuth, userProf } from './api/user'
import { ErrorHandler } from './errors'
import * as middleware from './middleware'

export const routes = express.Router()

// Api
routes.use('/api', userAuth)
// Wire up middleware
routes.use(middleware.verifyToken)
// user profile
routes.use('/api', userProf)
// Wire up error-handling middleware
routes.use(ErrorHandler.apiHandler)
routes.use(ErrorHandler.api404)
