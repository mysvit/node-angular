import { DateType, UsersTbl } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import { randomUUID } from 'crypto'
import { afterEach, beforeEach } from 'mocha'
import { Db } from '../../engine'
import { UsersDb } from './users-db'

const expect = chai.expect

describe('UserDb', () => {

    const UsersTbl = <UsersTbl>{
        user_id: randomUUID(),
        signup_date: new DateType().value,
        email: 'user@email.com',
        password_hash: 'hash',
        password_salt: 'salt',
        nickname: 'nickname',
        verification_code: '12345',
        is_del: 0,
        is_verified: 0,
        modify_date: null,
        sign_in_date: null,
        avatar_id: null,
        pre_verified_hash: null
    }

    const UsersTblUpd = <UsersTbl>{
        user_id: UsersTbl.user_id,
        signup_date: new DateType().value,
        email: 'user@email.comU',
        password_hash: 'hashU',
        password_salt: 'saltU',
        nickname: 'nicknameU',
        verification_code: '12340',
        is_del: 1,
        is_verified: 1,
        modify_date: new DateType().value,
        sign_in_date: new DateType().value,
        avatar_id: null,
        pre_verified_hash: 'hashPre'
    }

    const pool = Db.createPool(environment.db)
    after(async () => {
        await pool.end()
    })

    async function clearTable() {
        const dbUser = new UsersDb(pool)
        await dbUser.delete({email: UsersTbl.email})
        await dbUser.delete({email: UsersTblUpd.email})
    }

    beforeEach(async () => clearTable())
    afterEach(async () => clearTable())

    it('insert', async () => {
        const dbUser = new UsersDb(pool)
        const signup = await dbUser.insert(UsersTbl)
        expect(signup).to.be.eq(1)
    })

    it('select', async () => {
        const dbUser = new UsersDb(pool)
        await dbUser.insert(UsersTbl)
        const select = await dbUser.select(UsersTbl, <UsersTbl>{user_id: UsersTbl.user_id})
        expect(select).to.deep.eq(UsersTbl)
    })

    //TODO - add test for foreign key avatar_id
    it('update', async () => {
        const dbUser = new UsersDb(pool)
        await dbUser.insert(UsersTbl)
        await dbUser.update(
            UsersTblUpd,
            <UsersTbl>{user_id: UsersTblUpd.user_id})
        const select = await dbUser.select(
            UsersTblUpd,
            <UsersTbl>{user_id: UsersTblUpd.user_id})
        expect(select).to.deep.eq(UsersTblUpd)
    })

})
