import { UserSignupModel } from '@dto'
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
        chai.spy.on(coreUser.userDb, 'isEmailExist', async (email: string) => {
            return email === 'exist'
        })
        chai.spy.on(coreUser.userDb, 'isNickNameExist', async (nickname: string) => {
            return nickname === 'exist'
        })
        chai.spy.on(coreUser.userDb, 'signup', () => true)
    })

    afterEach(() => {
        chai.spy.restore(UserCore)
    })



    it('signup - not exist', async () => {
        const res = await coreUser.signup(<UserSignupModel>{
            nickname: 'not exist', email: 'not exist', password: 'pass'
        })
        expect(res).to.be.true
    })

    it('signup - email exist', async () => {
        try {
            await coreUser.signup(<UserSignupModel>{
                nickname: 'not exist', email: 'exist', password: 'pass'
            })
        } catch (error) {
            const errorMessage = new ErrorApi500(ErrorsMsg.EmailRegistered)
            expect(error.isOperational).to.be.eq(errorMessage.isOperational)
            expect(error.statusCode).to.be.eq(errorMessage.statusCode)
            expect(error.message).to.be.eq(errorMessage.message)
        }
    })

    it('signup - nickname exist', async () => {
        try {
            await coreUser.signup(<UserSignupModel>{
                nickname: 'exist', email: 'not exist', password: 'pass'
            })
        } catch (error) {
            const errorMessage = new ErrorApi500(ErrorsMsg.UserRegistered)
            expect(error.isOperational).to.be.eq(errorMessage.isOperational)
            expect(error.statusCode).to.be.eq(errorMessage.statusCode)
            expect(error.message).to.be.eq(errorMessage.message)
        }
    })

})
