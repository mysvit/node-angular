export interface DbConnection {
    host: string
    database: string
    user: string
    password: string
    connectionLimit: number
}

export interface Environment {
    production: boolean
    db: DbConnection
}