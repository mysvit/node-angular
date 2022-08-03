export interface DbConnection {
    host: string
    database: string
    user: string
    password: string
    connectionLimit: number
}

export interface Environment {
    production: boolean
    port: number
    db: DbConnection
    token_key: string
}

// default production
const isDev = process.env.NODE_ENV === 'dev'
const isTest = process.env.NODE_ENV === 'test'

export const environment: Environment = {
    production: !isTest && !isDev,

    port: isTest
        ? 3100
        : isDev
            ? 3000
            : 80,

    db: {
        host: isTest || isDev ? 'server-host' : 'prod-host',
        database: isTest || isDev ? 'server-db' : 'prod-db',
        user: 'root',
        password: isTest || isDev ? 'root' : 'prodPassword',
        connectionLimit: 5
    },
    token_key: '15f73e49d44d444c980d62b7bf05160fc057ad6f2417e4f13e9f069f972b14f8'
}
