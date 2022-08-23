import { UserTbl } from '@dto'
import { Db } from '../../engine/db'

export class UserDb extends Db {

    table = 'user'

    async insert(obj: UserTbl): Promise<number> {
        const insert = this.insertBuilder(this.table, obj)
        return await this.dbExecute(insert.sql, insert.values)
            .then(data => data.affectedRows)
    }

    async select(obj: UserTbl, whereObj: UserTbl): Promise<UserTbl> {
        const select = this.selectBuilder(obj, this.table, whereObj)
        return await this.dbQuery(select.sql, select.values)
            .then(data => data ? data[0] : undefined)
    }

    async update(obj: UserTbl, whereObj: UserTbl): Promise<number> {
        const update = this.updateBuilder(this.table, obj, whereObj)
        return await this.dbExecute(update.sql, update.values)
            .then(data => data.affectedRows)
    }

    async isEmailExist(email: string): Promise<number> {
        return await this.dbQuery(
            `SELECT 
                    COUNT(*) as cnt 
                FROM 
                    user 
                WHERE
                    is_del = 0
                    AND email = ?`,
            [email])
            .then(data => data['0'].cnt)
    }

    async verifyConfirmCode(email: string, confirm_code: string): Promise<number> {
        return await this.dbQuery(
            `SELECT 
                    COUNT(*) as cnt FROM user 
                WHERE
                    is_del = 0
                    AND email = ?
                    AND confirm_code = ?`,
            [email, confirm_code])
            .then(data => data['0'].cnt)
    }

    async confirmUser(user_id: string): Promise<number> {
        return await this.dbExecute(
            `UPDATE 
                    user
                SET
                    is_confirmed = 1,
                    confirm_code = NULL
                WHERE
                    user_id = ?`,
            [user_id])
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
