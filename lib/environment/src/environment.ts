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

// NODE_ENV === 'dev'
const isTest = process.env.NODE_ENV === 'test'

export const environment: Environment = {
    production: false,

    port: isTest
        ? 3100
        : 3000,

    db: <DbConnection>{
        host: 'server-host',
        database: 'server-db',
        user: 'root',
        password: 'root',
        connectionLimit: 5
    },

    email: <EmailConnection>{
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        auth: {
            user: 'lauren.miller@ethereal.email',   // https://ethereal.email/create generated ethereal user
            pass: 'eHjDayPw7nGeatxc3c'          // generated ethereal password
        }
    },

    token_key: '15f73e49d44d444c980d62b7bf05160fc057ad6f2417e4f13e9f069f972b14f8'
}
