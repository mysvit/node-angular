export interface DbConnection {
    host: string
    database: string
    user: string
    password: string
    connectionLimit: number
}

export interface EmailAuth {
    user: string
    pass: string
}

export interface EmailConnection {
    host: string
    port: number
    secure: boolean // true for 465, false for other ports
    connectionTimeout: number,
    greetingTimeout: number,
    auth: EmailAuth
}

export interface Environment {
    production: boolean
    port: number
    db: DbConnection
    email: EmailConnection
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

    db: <DbConnection>{
        host: isTest || isDev ? 'server-host' : 'prod-host',
        database: isTest || isDev ? 'server-db' : 'prod-db',
        user: 'root',
        password: isTest || isDev ? 'root' : 'prodPassword',
        connectionLimit: 5
    },

    email: <EmailConnection>{
        host: 'production smtp server',
        port: 993,
        secure: false,
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        auth: <EmailAuth>{
            user: 'server-cli@production.srv',
            pass: 'TestEmailPass'
        }
    },

    token_key: '15f73e49d44d444c980d62b7bf05160fc057ad6f2417e4f13e9f069f972b14f8'
}
