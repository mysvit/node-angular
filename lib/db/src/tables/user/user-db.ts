import { UserProfileShort, UserSecurityInfo, UserSignup } from '@dto'
import { Db } from '../db'

export class UserDb extends Db {

    async signup(userSignup: UserSignup): Promise<any> {
        return await this.dbExecute(
            `INSERT INTO user (user_id, user_name, user_email, user_hash, user_salt) 
                VALUES (?, ?, ?, ?, ?)`,
            userSignup.signupArr)
    }

    async getProfileShort(user_id: string): Promise<UserProfileShort> {
        return await this.dbQuery(
            `SELECT 
                    user_id, 
                    user_name, 
                    user_email
                FROM 
                    user 
                WHERE 
                    user_id = ?`,
            user_id)
            .then(data => data ? data[0] : undefined)
    }

    async getSecurityInfo(user_email: string): Promise<UserSecurityInfo> {
        return await this.dbQuery(
            `SELECT 
                    user_id, 
                    user_hash,
                    user_salt 
                FROM 
                    user 
                WHERE 
                    is_del = 0
                    AND user_email = ?`,
            [user_email])
            .then(data => data ? data[0] : undefined)
    }

    async isEmailExist(user_email: string): Promise<boolean> {
        return await this.dbQuery(
            `SELECT COUNT(*) as cnt FROM user 
                WHERE
                    is_del = 0
                    AND user_email = ?`,
            [user_email])
            .then(data => data['0'].cnt > 0)
    }

    async isNameExist(user_name: string): Promise<boolean> {
        return await this.dbQuery(
            `SELECT COUNT(*) as cnt FROM user 
                WHERE
                    is_del = 0
                    AND user_name = ?`,
            [user_name])
            .then(data => data['0'].cnt > 0)
    }

    // async update(user: User): Promise<boolean> {
    //     return await this.dbExecute(
    //         `UPDATE user
    //             SET
    //                 user_name=?,
    //                 user_email=?,
    //                 user_hash=?
    //             WHERE
    //                 user_id = ?`,
    //         user.updateArr)
    //         .then(data => data.affectedRows === 1)
    // }
    //
    // async delete(user_id: string): Promise<boolean> {
    //     return await this.dbExecute(
    //         `UPDATE user
    //             SET
    //                 is_del=1
    //             WHERE
    //                 user_id = ?`,
    //         user_id)
    //         .then(data => data.affectedRows === 1)
    // }

}
