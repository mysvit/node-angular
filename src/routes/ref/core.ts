import { PictureCore, UserCore } from '@core'
import { environment } from '@env'

export const userCore = new UserCore(environment)
export const pictureCore = new PictureCore(environment)
