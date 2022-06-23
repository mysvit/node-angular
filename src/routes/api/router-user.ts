import * as express from 'express'
import { apiUserGet } from './api-user.js'

// Router
export const routerUser = express.Router()

// apiUrl+/user/get
routerUser.get('/user/get', apiUserGet)
