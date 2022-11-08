import * as express from 'express'
import { commentsEditRouter, commentsViewRouter } from './api/comments'
import { commentsLikesRouter } from './api/comments-likes'
import { picturesRouter, pictureUrlRouter } from './api/pictures'
import { userAuth, userBase, userProf } from './api/users'
import { ErrorHandler } from './errors'
import { Middleware } from './middleware'

export const routes = express.Router()

// Api without auth
routes.use('/', userBase)
// picture url
routes.use('/', pictureUrlRouter)
// // user CommentsView
routes.use('/', commentsViewRouter)


// Authenticated
routes.use(Middleware.verifyToken)


// user Auth
routes.use('/', userAuth)
// user Profile
routes.use('/', userProf)
// user Picture
routes.use('/', picturesRouter)
// user CommentsEdit
routes.use('/', commentsEditRouter)
// user CommentsLikes
routes.use('/', commentsLikesRouter)


// 404 for authenticated path
routes.use(ErrorHandler.api404)
// Wire up error-handling middleware with 4 parameters
routes.use(ErrorHandler.apiHandler)
