import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { environment } from './environments/environment.js'
import { logger } from './logger.js'
import { ErrorHandler } from './routes/errors/error-handler.js'
import { routes } from "./routes/routes.js"

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const app = express()
    // Parse the request
    app.use(express.urlencoded({extended: true}))
    // Takes care of JSON data
    app.use(bodyParser.json())
    // Enable 11 function from 15 by default
    app.use(helmet())
    // CORS Options
    // app.use(cors(corsOptions))
    app.use(cors())
    // Wire up routers
    app.use(routes)
    return app
}

export function server() {
    // Promise rejection
    process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
        ErrorHandler.baseHandle(new Error(`Unhandled Rejection at: ${promise}/n reason: ${reason}`)).finally()
    })

    // last error resort
    process.on('uncaughtException', (error: Error, origin) => {
        error.stack = (error.stack || '').concat(`/n Exception origin: ${origin}`)
        ErrorHandler.baseHandle(error).finally()
        process.exit(1)
    })

    // Start up the Node server
    const server = app()
    server.listen(environment.port, () => {
        logger.info(`:) Node Express server listening on http://localhost:${environment.port}`)
    })
    server.on('close', () => {
        logger.info('Node Express server closed!')
    })
}

server()