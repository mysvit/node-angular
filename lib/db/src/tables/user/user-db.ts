import { User } from '@dto/index.js'
import { Db } from '../db.js'

export class UserDb extends Db {

    async getById(user_id: string): Promise<User> {
        return await this.dbQuery(
            `SELECT 
                    user_id, 
                    user_name, 
                    user_email, 
                    user_pass 
                FROM 
                    user 
                WHERE 
                    user_id = ?`,
            user_id)
            .then(data => data ? data[0] : undefined)
    }

    async isExist(user_name: string, user_email: string): Promise<boolean> {
        return await this.dbQuery(
            `SELECT user_name FROM user 
                WHERE
                    is_del = 0
                    AND user_name = ? 
                    AND user_email = ?`,
            [user_name, user_email])
            .then(data => {
                return !!data
            })
    }

    async add(user: User): Promise<string> {
        return await this.dbExecute(
            `INSERT INTO user (user_id, user_name, user_email, user_pass) 
                VALUES (?, ?, ?, ?) RETURNING user_id`,
            user.addArr)
            .then(data => {
                return data[0].user_id
            })
    }

    async update(user: User): Promise<boolean> {
        return await this.dbExecute(
            `UPDATE user
                SET
                    user_name=?,
                    user_email=?,
                    user_pass=?
                WHERE
                    user_id = ?`,
            user.updateArr)
            .then(data => data.affectedRows === 1)
    }

    async delete(user_id: string): Promise<boolean> {
        return await this.dbExecute(
            `UPDATE user
                SET
                    is_del=1
                WHERE
                    user_id = ?`,
            user_id)
            .then(data => data.affectedRows === 1)
    }

}