import * as express from 'express'
import { simpleGet } from './simple-api.js'

// Router
export const simpleRouter = express.Router()

// apiUrl+/simple/get
simpleRouter.get('/simple/get', simpleGet)
