import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { CommentsApi } from './comments-api'

// Router
export const commentsViewRouter = express.Router()
export const commentsEditRouter = express.Router()


// api/comment/list
commentsViewRouter.post(ApiPath.comments_list, ErrorHandler.apiCatch(CommentsApi.list))

// api/comment/get/:id
commentsViewRouter.get(ApiPath.comments_get, ErrorHandler.apiCatch(CommentsApi.get))


// api/comment/add
// [form]
// comment: CommentsTbl
commentsEditRouter.post(ApiPath.comments_add, ErrorHandler.apiCatch(CommentsApi.add))

// api/comment/upd
// [form]
// comment: Comment
commentsEditRouter.post(ApiPath.comments_upd, ErrorHandler.apiCatch(CommentsApi.upd))

