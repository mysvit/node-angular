import { Environment } from '@env'
import { createPool, Pool, QueryOptions } from 'mariadb'
import { SqlBuilder } from './sql-builder'

export class Db {

    pool: Pool
    table: string = ''


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

    async insert<T>(obj: T): Promise<number> {
        const ins = SqlBuilder.insertBuilder(this.table, obj)
        return await this.dbExecute(ins.sql, ins.values)
            .then(data => data.affectedRows)
    }

    async select<T>(obj: T, whereObj: T): Promise<T> {
        const sel = SqlBuilder.selectBuilder(this.table, obj, whereObj)
        return await this.dbQuery(sel.sql, sel.values)
            .then(data => data ? data[0] : undefined)
    }

    async list<T>(obj: T, whereObj: T): Promise<T> {
        const sel = SqlBuilder.selectBuilder(this.table, obj, whereObj)
        return await this.dbQuery(sel.sql, sel.values)
            .then(data => data ? data[0] : undefined)
    }

    async update<T>(obj: T, whereObj: T): Promise<number> {
        const upd = SqlBuilder.updateBuilder(this.table, obj, whereObj)
        return await this.dbExecute(upd.sql, upd.values)
            .then(data => data.affectedRows)
    }

    async delete<T>(whereObj: T): Promise<number> {
        const del = SqlBuilder.deleteBuilder(this.table, whereObj)
        return await this.dbExecute(del.sql, del.values)
            .then(data => data.affectedRows)
    }

}
