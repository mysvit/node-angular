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
        login_date: null,
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
        login_date: new DateDb().value,
        avatar_id: null,
        pre_verified_hash: 'hashPre'
    }

    async function clearTable() {
        const conn = await dbUser.getConnection
        try {
            await conn.execute('DELETE FROM user WHERE email = ?', userTbl.email)
            await conn.execute('DELETE FROM user WHERE email = ?', userTblUpd.email)
        } finally {
            if (conn) await conn.release()
        }
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

    // it('getSecurityInfo', async () => {
    //     await dbUser.signup(userSignup)
    //     const user = await dbUser.getSecurityInfo(userSignup.email)
    //     const userSecurityInfo = <UserSecurityInfoModel>{
    //         user_id: userSignup.user_id,
    //         password_hash: 'hash',
    //         password_salt: 'salt',
    //         is_confirmed: 0
    //     }
    //     expect(user).to.deep.eq(userSecurityInfo)
    // })
    //
    // it('isEmailExist (exist) is_confirmed=(true, false)', async () => {
    //     await dbUser.signup(userSignup)
    //     let res = await dbUser.isEmailExist(userSignup.email)
    //     expect(res).to.be.true
    //     await dbUser.confirmUser(userSignup.user_id)
    //     res = await dbUser.isEmailExist(userSignup.email)
    //     expect(res).to.be.true
    // })
    //
    // it('isEmailExist (not exist) is_confirmed=(true, false)', async () => {
    //     await dbUser.signup(userSignup)
    //     let res = await dbUser.isEmailExist('other@email.em')
    //     expect(res).to.be.false
    //     await dbUser.confirmUser(userSignup.user_id)
    //     res = await dbUser.isEmailExist('other@email.em')
    //     expect(res).to.be.false
    // })
    //
    // it('isUserConfirmed', async () => {
    //     await dbUser.signup(userSignup)
    //     let res = await dbUser.verifyConfirmCode(userSignup.user_id, '1111')
    //     expect(res).to.be.false
    //     res = await dbUser.verifyConfirmCode(userSignup.user_id, userSignup.confirm_code)
    //     expect(res).to.be.true
    // })

    // it('update', async () => {
    //     const res = await dbUser.update(userSignup)
    //     expect(res).to.be.true
    // })
    //
    // it('delete', async () => {
    //     const res = await dbUser.delete(userSignup.userId)
    //     expect(res).to.be.true
    // })

})
