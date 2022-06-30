import * as express from 'express'
import { userRouter } from './api/user'
import { ErrorHandler } from './errors'
import * as middleware from './middleware'

export const routes = express.Router()

// Api
routes.use('/api', userRouter)
// Wire up middleware
routes.use(middleware.doSomethingInteresting)
// Wire up error-handling middleware
routes.use(ErrorHandler.apiHandler)
routes.use(ErrorHandler.api404)