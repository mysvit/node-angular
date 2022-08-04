import { UserSignup, UserProfileShort, UserSecurityInfo } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import { randomUUID } from 'crypto'
import { after, before } from 'mocha'
import { UserDb } from './user-db'

const expect = chai.expect

describe('DbUser', () => {

    const dbUser = new UserDb(environment)
    const userSignup = new UserSignup({user_id: randomUUID(), user_name: 'username', user_email: 'user@email.com', user_hash: 'hash', user_salt: 'salt'})
    const userProfileShort = <UserProfileShort>{user_id: userSignup.user_id, user_name: userSignup.user_name, user_email: userSignup.user_email}
    const userSecurityInfo = <UserSecurityInfo>{user_id: userSignup.user_id, user_hash: 'hash', user_salt: 'salt'}

    before(() => {
    })

    // clear test data
    after(async () => {
        const conn = await dbUser.getConnection
        try {
            await conn.execute('DELETE FROM user WHERE user_name = ?', userSignup.user_name)
        } finally {
            if (conn) await conn.release()
        }
    })

    it('signup', async () => {
        const signup = await dbUser.signup(userSignup)
        expect(signup.affectedRows).to.be.eq(1)
    })

    it('getProfileShort', async () => {
        const user = await dbUser.getProfileShort(userSignup.user_id)
        expect(user).to.deep.eq(userProfileShort)
    })

    it('getSecurityInfo', async () => {
        const user = await dbUser.getSecurityInfo(userSignup.user_email)
        expect(user).to.deep.eq(userSecurityInfo)
    })

    it('isEmailExist', async () => {
        const res = await dbUser.isEmailExist(userSignup.user_email)
        expect(res).to.be.true
    })

    it('isEmailExist Not', async () => {
        const res = await dbUser.isEmailExist('some@email.em')
        expect(res).to.be.false
    })

    it('isUserExist', async () => {
        const res = await dbUser.isNameExist(userSignup.user_name)
        expect(res).to.be.true
    })

    it('isUserExist Not', async () => {
        const res = await dbUser.isNameExist('someuser')
        expect(res).to.be.false
    })

    // it('update', async () => {
    //     const res = await dbUser.update(userSignup)
    //     expect(res).to.be.true
    // })
    //
    // it('delete', async () => {
    //     const res = await dbUser.delete(userSignup.user_id)
    //     expect(res).to.be.true
    // })

})
