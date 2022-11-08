import { CommentsCore, CommentsLikesCore, PicturesCore, UserProfileCore, UsersCore } from '@core'
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

const usersPool = Db.createPool({...poolConfig, connectionLimit: 5})
const picturesPool = Db.createPool({...poolConfig, connectionLimit: 10})
const commentsPool = Db.createPool({...poolConfig, connectionLimit: 10})

export const usersCore = new UsersCore(environment, logger, usersPool)
export const usersProfileCore = new UserProfileCore(environment, logger, usersPool)

export const picturesCore = new PicturesCore(environment, logger, picturesPool)

export const commentsCore = new CommentsCore(environment, logger, commentsPool)
export const commentsLikesCore = new CommentsLikesCore(environment, logger, commentsPool)
