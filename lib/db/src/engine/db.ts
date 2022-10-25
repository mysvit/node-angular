import { DbConnection } from '@env'
import { Connection, createPool, Pool, PoolConnection, QueryOptions } from 'mariadb'
import { SqlBuilder } from './sql-builder'

export class Db {

    // pool: Pool
    table: string = ''

    static createPool(dbConfig: DbConnection) {
        return createPool(dbConfig)
    }

    constructor(public pool: Connection | PoolConnection| Pool) {
        // logger: {
        //     query: (msg) => logger.info(msg),
        //         error: (err) => logger.error(err),
        // }
        // this.pool = createPool(this.environment.db)
    }

    // get getConnection() {
    //     return this.pool.getConnection()
    // }

    // endPool() {
    //     return this.pool.end()
    // }

    async dbQuery(sql: string | QueryOptions, values?: any): Promise<any> {
        // const conn = await this.getConnection
        // try {
        //     return conn.query(sql, values)
        // } finally {
        //     if (conn) await conn.release()
        // }
    }

    async dbExecute(sql: string | QueryOptions, values?: any): Promise<any> {
        // const conn = await this.getConnection
        // let result = {affectedRows: undefined}
        // try {
        //     result = await conn.execute(sql, values)
        // } finally {
        //     if (conn) await conn.end()
        // }
        // return result
    }

    async insert<T>(obj: T): Promise<number> {
        const ins = SqlBuilder.insertBuilder(this.table, obj)
        return this.pool.query(ins.sql, ins.values)
            .then(data => data.affectedRows)
    }

    async select<T>(obj: T, whereObj: T): Promise<T> {
        const sel = SqlBuilder.selectBuilder(this.table, obj, whereObj)
        return this.pool.query(sel.sql, sel.values)
            .then(data => data ? data[0] : undefined)
    }

    async update<T>(obj: T, whereObj: T): Promise<number> {
        const upd = SqlBuilder.updateBuilder(this.table, obj, whereObj)
        return this.pool.query(upd.sql, upd.values)
            .then(data => data.affectedRows)
    }

    async delete<T>(whereObj: T): Promise<number> {
        const del = SqlBuilder.deleteBuilder(this.table, whereObj)
        return this.pool.query(del.sql, del.values)
            .then(data => data.affectedRows)
    }

}
