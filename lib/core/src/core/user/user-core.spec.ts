import { User } from '@dto'
import { Environment } from '@env'
import { ErrorApi500, ErrorsMsg } from '@shared'
import chai from 'chai'
import chaiSpies from 'chai-spies'
import { afterEach, beforeEach } from 'mocha'
import { UserCore } from './user-core'

const expect = chai.expect
chai.use(chaiSpies)

describe('CoreUser', () => {

    const coreUser = new UserCore(<Environment>{db: {}})

    beforeEach(() => {
        chai.spy.on(coreUser.dbUser, 'isEmailExist', async (user_email: string) => {
            return user_email === 'exist'
        })
        chai.spy.on(coreUser.dbUser, 'isUserExist', async (user_name: string) => {
            return user_name === 'exist'
        })
        chai.spy.on(coreUser.dbUser, 'add', () => true)
    })

    afterEach(() => {
        chai.spy.restore(UserCore)
    })

    it('add - not exist', async () => {
        const user = new User({user_name: 'not exist', user_email: 'not exist'})
        const res = await coreUser.add(user)
        expect(res).to.be.true
    })

    it('add - email exist', async () => {
        const user = new User({user_name: 'not exist', user_email: 'exist'})
        try {
            await coreUser.add(user)
        } catch (err) {
            const er = new ErrorApi500(ErrorsMsg.EmailRegistered)
            expect(err.isOperational).to.be.eq(er.isOperational)
            expect(err.statusCode).to.be.eq(er.statusCode)
            expect(err.message).to.be.eq(er.message)
        }
    })

    it('add - user exist', async () => {
        const user = new User({user_name: 'exist', user_email: 'not exist'})
        try {
            await coreUser.add(user)
        } catch (err) {
            const er = new ErrorApi500(ErrorsMsg.UserRegistered)
            expect(err.isOperational).to.be.eq(er.isOperational)
            expect(err.statusCode).to.be.eq(er.statusCode)
            expect(err.message).to.be.eq(er.message)
        }
    })

})
