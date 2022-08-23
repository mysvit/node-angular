import { Environment } from '@env'
import { createPool, QueryOptions } from 'mariadb'
import { BuilderResult } from './insert-build'

export class Db {

    pool = createPool(this.environment.db)

    constructor(public environment: Environment) {
    }

    get getConnection() {
        return this.pool.getConnection()
    }

    insertBuilder(table, obj): BuilderResult {
        const sql = `INSERT INTO ${table}               ( ${getInsertFields(obj)} ) 
                     VALUES (${getInsertParams(obj)})`
        const values = getValues(obj)
        return <BuilderResult>{sql: sql, values: values}
    }

    updateBuilder(table, obj, whereObj) {
        const sql = `UPDATE 
                        ${table}
                     SET
                        ${getUpdateFields(obj)} 
                     WHERE 
                        ${getWhere(whereObj)}`
        const values = getValues(obj).concat(getValues(whereObj))
        return <BuilderResult>{sql: sql, values: values}
    }

    selectBuilder(table, obj, whereObj) {
        const sql = `SELECT
                        ${getSelectFields(obj)}
                     FROM
                        ${table} `
        + whereObj ? `WHERE ${getWhere(whereObj)}` : ''
        const values = getValues(obj).concat(getValues(whereObj))
        return <BuilderResult>{sql: sql, values: values}
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

function getInsertFields(obj) {
    return Object.getOwnPropertyNames(obj).join(',')
}

function getInsertParams(obj) {
    return Object.getOwnPropertyNames(obj).map(() => '?').join(',')
}

function getSelectFields(obj) {
    return Object.getOwnPropertyNames(obj).join(',')
}

function getUpdateFields(obj) {
    return Object.getOwnPropertyNames(obj).map(fieldName => `${fieldName} = ?`).join(',')
}

function getWhere(obj) {
    return Object.getOwnPropertyNames(obj).map(fieldName => `${fieldName} = ?`).join(' AND ')
}

function getValues(obj) {
    return Object.getOwnPropertyNames(obj).map(fieldName => obj[fieldName])
}
