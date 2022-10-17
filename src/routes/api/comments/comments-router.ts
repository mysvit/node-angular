import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { CommentsApi } from './comments-api'

// Router
export const commentsRouter = express.Router()

// api/comment/add
// [form]
// comment: CommentsTbl
commentsRouter.post(ApiPath.comment_add, ErrorHandler.apiCatch(CommentsApi.add))

// api/comment/list
commentsRouter.post(ApiPath.comment_list, ErrorHandler.apiCatch(CommentsApi.list))

// api/comment/upd
// [form]
// comment: Comment
commentsRouter.post(ApiPath.comment_upd, ErrorHandler.apiCatch(CommentsApi.upd))

// api/comment/get/:id
commentsRouter.get(ApiPath.comment_get, ErrorHandler.apiCatch(CommentsApi.get))
