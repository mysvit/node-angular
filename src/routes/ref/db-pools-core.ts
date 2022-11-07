import { CommentsCore, CommentsLikesCore, PictureCore, UserCore, UserProfileCore } from '@core'
import { Db } from '@db'
import { environment } from '@env'
import { logger } from './logger'

let poolConfig = environment.db
poolConfig = {
    ...poolConfig,
    logger: {
        // silly network traffic
        // network: (msg) => logger.debug(msg),
        query: (msg) => logger.info(msg),
        error: (err) => logger.error(err)
    }
}

const userPool = Db.createPool({...poolConfig, connectionLimit: 5})
const picturePool = Db.createPool({...poolConfig, connectionLimit: 10})
const commentsPool = Db.createPool({...poolConfig, connectionLimit: 10})

export const userCore = new UserCore(environment, logger, userPool)
export const userProfileCore = new UserProfileCore(environment, logger, userPool)

export const pictureCore = new PictureCore(environment, logger, picturePool)

export const commentsCore = new CommentsCore(environment, logger, commentsPool)
export const commentsLikesCore = new CommentsLikesCore(environment, logger, commentsPool)
