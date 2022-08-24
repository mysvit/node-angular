import { AuthModel, LoginModel, UserSignupModel } from '@dto'
import { environment } from '@env'
import chai from 'chai'
import chaiSpies from 'chai-spies'
import { UserCore } from './user-core'

const expect = chai.expect
chai.use(chaiSpies)

describe('CoreUser', () => {

    const coreUser = new UserCore(environment)

    afterEach(() => {
        chai.spy.restore(coreUser)
    })

    it('signup', async () => {
        chai.spy.on(coreUser, 'isEmailExist', () => false)
        chai.spy.on(coreUser.userDb, 'insert', () => 1)
        const res = await coreUser.signup(<UserSignupModel>{nickname: 'not exist', email: 'not exist', password: 'pass'})
        expect(res).to.be.eq(1)
    })

    it('login need_confirm', async () => {
        chai.spy.on(coreUser, 'loginAllFieldRequired', () => true)
        chai.spy.on(coreUser, 'getUserIfExist', () => true)
        chai.spy.on(coreUser, 'needConfirmation', () => {
            return <AuthModel>{user_id: 'id', need_confirm: 1}
        })
        // confirmation required
        const login = await coreUser.login(<LoginModel>{email: 'name@email.com', password: 'pass'})
        expect(login).to.deep.eq(<AuthModel>{user_id: 'id', need_confirm: 1})
    })

    it('login return token', async () => {
        chai.spy.on(coreUser, 'loginAllFieldRequired', () => true)
        chai.spy.on(coreUser, 'getUserIfExist', () => true)
        chai.spy.on(coreUser, 'needConfirmation', () => undefined)
        chai.spy.on(coreUser, 'getTokenIfVerified', () => {
            return <AuthModel>{user_id: 'id', token: 'token'}
        })
        const login = await coreUser.login(<LoginModel>{email: 'name@email.com', password: 'pass'})
        expect(login).to.deep.eq(<AuthModel>{user_id: 'id', token: 'token'})
    })

})
