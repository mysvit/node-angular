import * as express from 'express'
import * as api from "./api/user"
import { ErrorHandler } from './errors/error-handler.js'
import * as middleware from './middleware/middleware.js'

export const routes = express.Router()

// Api
routes.use('/api', api.userRouter)
// Wire up middleware
routes.use(middleware.doSomethingInteresting)
// Wire up error-handling middleware
routes.use(ErrorHandler.apiHandler)
routes.use(ErrorHandler.api404)