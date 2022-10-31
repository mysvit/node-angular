import { ApiPath } from '@shared'
import * as express from 'express'
import { ErrorHandler } from '../../errors'
import { CommentsLikesApi } from './comments-likes-api'


// Router
export const commentsLikesRouter = express.Router()


// api/comments-likes/set
commentsLikesRouter.post(ApiPath.comments_likes_set, ErrorHandler.apiCatch(CommentsLikesApi.set))
