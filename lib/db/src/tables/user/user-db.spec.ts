import { DateDb, UserTbl } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import { randomUUID } from 'crypto'
import { afterEach, beforeEach } from 'mocha'
import { UserDb } from './user-db'

const expect = chai.expect

describe('UserDb', () => {

    const dbUser = new UserDb(environment)
    const userTbl = <UserTbl>{
        user_id: randomUUID(),
        signup_date: new DateDb().value,
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

    const userTblUpd = <UserTbl>{
        user_id: userTbl.user_id,
        signup_date: new DateDb().value,
        email: 'user@email.comU',
        password_hash: 'hashU',
        password_salt: 'saltU',
        nickname: 'nicknameU',
        verification_code: '12340',
        is_del: 1,
        is_verified: 1,
        modify_date: new DateDb().value,
        sign_in_date: new DateDb().value,
        avatar_id: null,
        pre_verified_hash: 'hashPre'
    }

    async function clearTable() {
        await dbUser.delete({email: userTbl.email})
        await dbUser.delete({email: userTbl.email})
    }

    beforeEach(async () => dbUser.insert(userTbl))
    afterEach(async () => clearTable())

    it('insert', async () => {
        await clearTable()
        const signup = await dbUser.insert(userTbl)
        expect(signup).to.be.eq(1)
    })

    it('select', async () => {
        const select = await dbUser.select(userTbl, <UserTbl>{user_id: userTbl.user_id})
        expect(select).to.deep.eq(userTbl)
    })

    //TODO - add test for foreign key avatar_id
    it('update', async () => {
        await dbUser.update(
            userTblUpd,
            <UserTbl>{user_id: userTblUpd.user_id})
        const select = await dbUser.select(
            userTblUpd,
            <UserTbl>{user_id: userTblUpd.user_id})
        expect(select).to.deep.eq(userTblUpd)
    })

})
