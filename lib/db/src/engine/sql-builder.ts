import { Select, SelectLimit, SelectOrder, SelectWhere } from '@shared'
import { BuilderResult } from './insert-build'

export namespace SqlBuilder {

    export function insertBuilder(table, obj): BuilderResult {
        const sql = `INSERT INTO ${table} (${getFields(obj)}) VALUES (${getInsertParams(obj)})`
        const values = getValues(obj)
        return <BuilderResult>{sql: sql, values: values}
    }

    export function selectBuilder(table, obj, whereObj) {
        let sql = `SELECT ${getFields(obj)} FROM ${table}`
        sql += whereObj ? ` WHERE ${getWhere(whereObj)}` : ''
        const whereValues = getValues(whereObj)
        return <BuilderResult>{sql: sql, values: whereValues}
    }

    export function listBuilder(table: string, select: Select) {
        let sql = getSelectFields(select.selectFields)
        sql += getSelectFrom(table)
        sql += getSelectWhere(select.selectWhere)
        sql += getSelectOrder(select.selectOrder)
        sql += getSelectLimit(select.selectLimit)
        const whereValues = []
            // getValues(select.)
        return <BuilderResult>{sql: sql, values: whereValues}
    }

    export function updateBuilder(table, obj, whereObj) {
        const sql = `UPDATE ${table} SET ${getUpdateFields(obj)} WHERE ${getWhere(whereObj)}`
        const values = getValues(obj).concat(getValues(whereObj))
        return <BuilderResult>{sql: sql, values: values}
    }

    export function deleteBuilder(table, whereObj) {
        const sql = `DELETE FROM ${table} WHERE ${getWhere(whereObj)}`
        const values = getValues(whereObj)
        return <BuilderResult>{sql: sql, values: values}
    }

}

export function getSelectFields(fields: string[]) {
    return `SELECT ${fields.join(',')}`
}

export function getSelectFrom(table: string) {
    return ` FROM ${table}`
}

export function getSelectWhere(selectWhere: SelectWhere[]) {
    // TODO: where build
    return selectWhere ? ' WHERE ' + selectWhere.map(fieldName => `${fieldName}=?`).join(' AND ') : ''
}

export function getSelectOrder(selectOrder: SelectOrder[]) {
    return selectOrder ? ' ORDER BY ' + selectOrder.map(order => `${order.field} ${order.order}`).join(' , ') : ''
}

export function getSelectLimit(selectLimit: SelectLimit) {
    return `${selectLimit.limit} ${selectLimit.limit}`
}

export function getFields(obj) {
    return Object.getOwnPropertyNames(obj).join(',')
}

export function getValues(obj) {
    if (obj) {
        return Object.getOwnPropertyNames(obj).map(fieldName => obj[fieldName])
    } else {
        return []
    }
}

export function getInsertParams(obj) {
    return Object.getOwnPropertyNames(obj).map(() => '?').join(',')
}

export function getUpdateFields(obj) {
    return Object.getOwnPropertyNames(obj).map(fieldName => `${fieldName}=?`).join(',')
}

export function getWhere(obj) {
    return Object.getOwnPropertyNames(obj).map(fieldName => `${fieldName}=?`).join(' AND ')
}
