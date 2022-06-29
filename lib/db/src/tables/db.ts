import { Environment } from '@shared/config/environment.js'
import { createPool, QueryOptions } from 'mariadb'

export class Db {

    pool = createPool(this.environment.db)

    constructor(public environment: Environment) {
    }

    get getConnection() {
        return this.pool.getConnection()
    }

    async dbQuery(sql: string | QueryOptions, values?: any): Promise<any> {
        const conn = await this.getConnection
        try {
            return conn.query(sql, values)
        } finally {
            if (conn) await conn.release()
        }
    }

    async dbExecute(sql: string | QueryOptions, values?: any): Promise<any> {
        const conn = await this.getConnection
        try {
            return conn.execute(sql, values)
        } finally {
            if (conn) await conn.release()
        }
    }

}