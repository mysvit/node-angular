import { Environment } from '@shared/config/environment.js'

export const environment: Environment = {
        production: false,
        port: process.env.NODE_ENV === 'test' ? 3100 : 3000,
        db: {
                host: 'server-db',
                database: 'serverdb',
                user: 'root',
                password: 'root',
                connectionLimit: 5
        }
}