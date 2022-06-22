import * as express from 'express'
import * as middleware from './middleware/middleware.js'
import * as errors from './errors/errors.js'
import * as api from "./api/index.js";

export const routes = express.Router()

// Api
routes.use('/api', api.routerUser)
// Wire up middleware
routes.use(middleware.doSomethingInteresting)
// Wire up error-handling middleware
routes.use(errors.errorHandle)
routes.use(errors.nullRoute)
