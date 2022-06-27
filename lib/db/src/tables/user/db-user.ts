import { User } from '@dto/dto.js'
import { DbBase } from '../../db-base.js'

export class DbUser extends DbBase {

  async getById(user_id: string): Promise<User> {
    // let conn
    // try {
      const conn = await this.pool.getConnection()
      return await conn.query('SELECT * FROM user')
    // } catch (err) {
    //   throw err
    // } finally {
    //   if (conn) await conn.release()
    // }
  }

}