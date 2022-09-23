import { PictureTbl, SignInModel, UserSignupModel, UserTbl } from '@dto'
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
        chai.spy.on(coreUser.pictureDto, 'pictureTblFromModel', () => <PictureTbl>{})
        chai.spy.on(coreUser.pictureDb, 'insert', () => 1)
        chai.spy.on(coreUser.userDto, 'userTblFromModel', () => <UserTbl>{email: 'my@email.com', verification_code: '12345'})
        chai.spy.on(coreUser.userDb, 'insert', () => 1)
        chai.spy.on(coreUser, 'sendVerificationCode', () => 1)
        const res = await coreUser.signup(<UserSignupModel>{nickname: 'not exist', email: 'my@email.com', password: 'pass', avatar: {pictureId: 'id'}})
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
