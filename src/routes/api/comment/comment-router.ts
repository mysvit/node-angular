import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { CommentApi } from './comment-api'

// Router
export const commentRouter = express.Router()

// api/comment/add
// [form]
// comment: CommentsTbl
commentRouter.post(ApiPath.comment_add, ErrorHandler.apiCatch(CommentApi.add))

// api/comment/upd
// [form]
// comment: Comment
commentRouter.post(ApiPath.comment_upd, ErrorHandler.apiCatch(CommentApi.upd))

// api/comment/get/:id
commentRouter.get(ApiPath.comment_get, ErrorHandler.apiCatch(CommentApi.get))
