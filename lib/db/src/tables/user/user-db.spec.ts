import { UserProfileShortModel, UserSecurityInfoModel, UserSignupModel } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import { randomUUID } from 'crypto'
import { after, before } from 'mocha'
import { UserDb } from './user-db'

const expect = chai.expect

describe('UserDb', () => {

    const dbUser = new UserDb(environment)
    const userSignup = new UserSignupModel({user_id: randomUUID(), username: 'username', email: 'user@email.com', password_hash: 'hash', password_salt: 'salt'})
    const userProfileShort = <UserProfileShortModel>{user_id: userSignup.user_id, username: userSignup.username, email: userSignup.email}
    const userSecurityInfo = <UserSecurityInfoModel>{user_id: userSignup.user_id, password_hash: 'hash', password_salt: 'salt'}

    before(() => {
    })

    // clear test data
    after(async () => {
        const conn = await dbUser.getConnection
        try {
            await conn.execute('DELETE FROM user WHERE username = ?', userSignup.username)
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
        const user = await dbUser.getSecurityInfo(userSignup.email)
        expect(user).to.deep.eq(userSecurityInfo)
    })

    it('isEmailExist', async () => {
        const res = await dbUser.isEmailExist(userSignup.email)
        expect(res).to.be.true
    })

    it('isEmailExist Not', async () => {
        const res = await dbUser.isEmailExist('some@email.em')
        expect(res).to.be.false
    })

    it('isUserExist', async () => {
        const res = await dbUser.isNameExist(userSignup.username)
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
    //     const res = await dbUser.delete(userSignup.userId)
    //     expect(res).to.be.true
    // })

})
