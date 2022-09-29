import { PictureCore, UserCore, UserProfileCore, CommentCore } from '@core'
import { environment } from '@env'

export const userCore = new UserCore(environment)
export const userProfileCore = new UserProfileCore(environment)
export const pictureCore = new PictureCore(environment)
export const commentCore = new CommentCore(environment)
