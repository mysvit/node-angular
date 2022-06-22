import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { logger } from './logger.js'
// import { copyConfig, loadConfig } from "./config";
import { routes } from "./routes/routes.js"
// copy config file in development mode
// console.log(process.env['PRG_ENV'])
// if (process.env['PRG_ENV'] === 'DEV') {
//   copyConfig()
// }
// loadConfig()

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
    const port = process.env['NODE_ENV'] === 'test' ? 3100 : 3000
    // process.env['PORT'] || 3000

    // Start up the Node server
    const server = app()
    server.listen(port, () => {
        logger.info(`:) Node Express server listening on http://localhost:${port}`)
    })
    server.on('close', () => {
        logger.info('Node Express server closed!')
    })
}

server()
