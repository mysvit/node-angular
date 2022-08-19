import { UserProfileShortModel, UserSecurityInfoModel, UserSignupModel } from '@dto'
import { Db } from '../db'

export class UserDb extends Db {

    async signup(userSignup: UserSignupModel): Promise<any> {
        return await this.dbExecute(
            `INSERT INTO user (user_id, username, email, password_hash, password_salt) 
                VALUES (?, ?, ?, ?, ?)`,
            userSignup.signupArr)
    }

    async getProfileShort(user_id: string): Promise<UserProfileShortModel> {
        return await this.dbQuery(
            `SELECT 
                    user_id, 
                    username, 
                    email
                FROM 
                    user 
                WHERE 
                    user_id = ?`,
            user_id)
            .then(data => data ? data[0] : undefined)
    }

    async getSecurityInfo(email: string): Promise<UserSecurityInfoModel> {
        return await this.dbQuery(
            `SELECT 
                    user_id, 
                    password_hash,
                    password_salt 
                FROM 
                    user 
                WHERE 
                    is_del = 0
                    AND email = ?`,
            [email])
            .then(data => data ? data[0] : undefined)
    }

    async isEmailExist(email: string): Promise<boolean> {
        return await this.dbQuery(
            `SELECT COUNT(*) as cnt FROM user 
                WHERE
                    is_del = 0
                    AND email = ?`,
            [email])
            .then(data => data['0'].cnt > 0)
    }

    async isNameExist(username: string): Promise<boolean> {
        return await this.dbQuery(
            `SELECT COUNT(*) as cnt FROM user 
                WHERE
                    is_del = 0
                    AND username = ?`,
            [username])
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
    //                 userId = ?`,
    //         user.updateArr)
    //         .then(data => data.affectedRows === 1)
    // }
    //
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
