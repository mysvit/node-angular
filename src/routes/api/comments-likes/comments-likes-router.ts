import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { CommentsLikesApi } from './comments-likes-api'


// Router
export const commentsLikesRouter = express.Router()


// api/comment/list
commentsLikesRouter.post(ApiPath.comments_likes_list, ErrorHandler.apiCatch(CommentsLikesApi.list))
