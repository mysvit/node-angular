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

export const environment: Environment = {
    production: true,

    port: 80,

    db: <DbConnection>{
        host: 'prod-host',
        database: 'prod-db',
        user: 'root',
        password: 'prodPassword',
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
