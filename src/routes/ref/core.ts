import { PictureCore, UserCore, UserProfileCore, CommentsCore } from '@core'
import { environment } from '@env'

export const userCore = new UserCore(environment)
export const userProfileCore = new UserProfileCore(environment)
export const pictureCore = new PictureCore(environment)
export const commentsCore = new CommentsCore(environment)
