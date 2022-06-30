import { User } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import { randomUUID } from 'crypto'
import { after, before } from 'mocha'
import { UserDb } from './user-db'

const expect = chai.expect

describe('DbUser', () => {

    const dbUser = new UserDb(environment)
    const user_test = new User({user_id: randomUUID(), user_name: 'username', user_email: 'user@email.com', user_pass: 'hash'})

    before(() => {
    })

    // clear test data
    after(async () => {
        const conn = await dbUser.getConnection
        try {
            await conn.execute('DELETE FROM user WHERE user_name = ?', user_test.user_name)
        } finally {
            if (conn) await conn.release()
        }
    })

    it('add', async () => {
        const user_id = await dbUser.add(user_test)
        expect(user_id).to.be.eq(user_test.user_id)
    })

    it('getById', async () => {
        const user = await dbUser.getById(user_test.user_id)
        expect(user).to.deep.eq(user_test)
    })

    it('isExist', async () => {
        const res = await dbUser.isExist(user_test.user_name, user_test.user_email)
        expect(res).to.be.true
    })

    it('update', async () => {
        const res = await dbUser.update(user_test)
        expect(res).to.be.true
    })

    it('delete', async () => {
        const res = await dbUser.delete(user_test.user_id)
        expect(res).to.be.true
    })

})