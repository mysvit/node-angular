import { Select, SelectLimit, SelectOrder, SelectWhere } from '@shared'
import { BuilderResult } from './insert-build'

export namespace SqlBuilder {

    function getValues(obj) {
        if (obj) {
            return Object.getOwnPropertyNames(obj).map(fieldName => obj[fieldName])
        } else {
            return []
        }
    }

    function whereEqBuild(whereObj) {
        return ' WHERE ' + Object.getOwnPropertyNames(whereObj).map(fieldName => `${fieldName}=?`).join(' AND ')
    }


    function selectFromTbl(table: string) {
        return 'SELECT * FROM ' + table
    }

    function updateTbl(table: string) {
        return 'UPDATE ' + table
    }

    function setBuild(updateObj) {
        return ' SET ' + Object.getOwnPropertyNames(updateObj).map(fieldName => `${fieldName}=?`).join(',')
    }


    export function selectOneBuilder(table: string, whereObj: any): BuilderResult {
        const sql =
            selectFromTbl(table) +
            whereEqBuild(whereObj)
        const values = getValues(whereObj)
        return <BuilderResult>{sql: sql, values: values}
    }

    export function updateBuilder(table, updateObj, whereObj) {
        const sql =
            updateTbl(table) +
            setBuild(updateObj) +
            whereEqBuild(whereObj)
        const values = getValues(updateObj).concat(getValues(whereObj))
        return <BuilderResult>{sql: sql, values: values}
    }


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
