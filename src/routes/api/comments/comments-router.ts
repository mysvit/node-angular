import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { Middleware } from '../../middleware'
import { CommentsApi } from './comments-api'

// Router
export const commentsViewRouter = express.Router()
export const commentsEditRouter = express.Router()


// api/comments/list
commentsViewRouter.post(ApiPath.comments_list, Middleware.verifyUserId, ErrorHandler.apiCatch(CommentsApi.list))

// api/comments/list-count
commentsViewRouter.post(ApiPath.comments_list_count, Middleware.verifyUserId, ErrorHandler.apiCatch(CommentsApi.listCount))

// api/comments/get/:id
// commentsViewRouter.get(ApiPath.comments_get, ErrorHandler.apiCatch(CommentsApi.get))


// api/comments/add
// [form]
// comment: CommentsTbl
commentsEditRouter.post(ApiPath.comments_add, ErrorHandler.apiCatch(CommentsApi.add))

// api/comments/upd
// [form]
// comment: Comment
commentsEditRouter.post(ApiPath.comments_upd, ErrorHandler.apiCatch(CommentsApi.upd))

// api/comments/del/:id
commentsViewRouter.delete(ApiPath.comments_del, ErrorHandler.apiCatch(CommentsApi.del))
