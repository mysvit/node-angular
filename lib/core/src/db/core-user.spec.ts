import { User } from '@dto/dto.js'
import { Environment } from '@shared/config/environment.js'
import { ErrorApi500 } from '@shared/errors/index.js'
import { ErrorsMsg } from '@shared/translation/errors-msg.js'
import chai from 'chai'
import chaiSpies from 'chai-spies'
import { afterEach } from 'mocha'
import { CoreUser } from './core-user.js'

const expect = chai.expect
chai.use(chaiSpies)

describe('CoreUser', () => {

    const coreUser = new CoreUser(<Environment>{db: {}})

    afterEach(() => {
        chai.spy.restore(CoreUser)
    })

    // test input parameters
    it('add', async () => {
        chai.spy.on(coreUser.dbUser, 'isExist', async (user_name: string, user_email: string) => {
            return user_name === 'exist' || user_email === 'exist'
        })
        chai.spy.on(coreUser.dbUser, 'add', () => true)

        let user = new User({user_name: 'not exist', user_email: 'not exist'})
        const res = await coreUser.add(user)
        expect(res).to.be.true

        user = new User({user_name: 'exist', user_email: 'not exist'})
        try {
            await coreUser.add(user)
        } catch (err) {
            const er = new ErrorApi500(ErrorsMsg.EmailRegistered)
            expect(err.isOperational).to.be.eq(er.isOperational)
            expect(err.statusCode).to.be.eq(er.statusCode)
            expect(err.message).to.be.eq(er.message)
        }
    })

})