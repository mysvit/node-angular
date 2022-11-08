import { Db } from '@db'
import { SignInModel, UserSignupModel } from '@dto'
import { environment } from '@env'
import { Logger } from '@shared'
import chai from 'chai'
import chaiSpies from 'chai-spies'
import { UsersCore } from './users-core'

const expect = chai.expect
chai.use(chaiSpies)

describe('CoreUser', () => {

    const coreUser = new UsersCore(environment, new Logger(environment), Db.createPool(environment.db))

    afterEach(() => {
        chai.spy.restore(coreUser)
    })

    it('signup', async () => {
        chai.spy.on(coreUser, 'isEmailExist', () => false)
        chai.spy.on(coreUser.picturesDb, 'insert', () => 1)
        chai.spy.on(coreUser.usersDb, 'insert', () => 1)
        chai.spy.on(coreUser, 'sendVerificationCode', () => 1)
        const res = await coreUser.signup(<UserSignupModel>{
            nickname: 'not exist', email: 'my@email.com', password: 'pass', avatar: {pictureId: 'id', contentBase64: 'base64,FFF'}
        })
        expect(res).to.be.eq(1)
    })

    it('sign_in need confirm', async () => {
        chai.spy.on(coreUser, 'loginAllFieldRequired', () => true)
        chai.spy.on(coreUser, 'getUserIfExist', () => true)
        chai.spy.on(coreUser, 'checkIfNeedConfirmation', () => 'ok')
        // confirmation required
        const login = await coreUser.signIn(<SignInModel>{email: 'name@email.com', password: 'pass'})
        expect(login).to.be.eq('ok')
    })

    it('sign_in return token', async () => {
        chai.spy.on(coreUser, 'loginAllFieldRequired', () => true)
        chai.spy.on(coreUser, 'getUserIfExist', () => true)
        chai.spy.on(coreUser, 'checkIfNeedConfirmation', () => undefined)
        chai.spy.on(coreUser, 'getTokenIfPassOk', () => 'ok')
        const login = await coreUser.signIn(<SignInModel>{email: 'name@email.com', password: 'pass'})
        expect(login).to.be.eq('ok')
    })

})
