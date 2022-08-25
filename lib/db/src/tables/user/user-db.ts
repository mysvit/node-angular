import { UserTbl } from '@dto'
import { Db } from '../../engine/db'
import { SqlBuilder } from '../../engine/sql-builder'

export class UserDb extends Db {

    table = 'user'

    async insert(obj: UserTbl): Promise<number> {
        const insert = SqlBuilder.insertBuilder(this.table, obj)
        return await this.dbExecute(insert.sql, insert.values)
            .then(data => data.affectedRows)
    }

    async select(obj: UserTbl, whereObj: UserTbl): Promise<UserTbl> {
        const select = SqlBuilder.selectBuilder(this.table, obj, whereObj)
        return await this.dbQuery(select.sql, select.values)
            .then(data => data ? data[0] : undefined)
    }

    async update(obj: UserTbl, whereObj: UserTbl): Promise<number> {
        const update = SqlBuilder.updateBuilder(this.table, obj, whereObj)
        return await this.dbExecute(update.sql, update.values)
            .then(data => data.affectedRows)
    }

    // async delete(userId: string): Promise<boolean> {
    //     return await this.dbExecute(
    //         `UPDATE user
    //             SET
    //                 is_del=1
    //             WHERE
    //                 userId = ?`,
    //         userId)
    //         .then(data => data.affectedRows === 1)
    // }

}
