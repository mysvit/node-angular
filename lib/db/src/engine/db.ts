import { Environment } from '@env'
import { createPool, Pool, QueryOptions } from 'mariadb'

export class Db {

    pool: Pool

    constructor(public environment: Environment) {
        this.pool = createPool(this.environment.db)
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
