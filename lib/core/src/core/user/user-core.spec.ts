import { LoginModel, PictureTbl, UserSignupModel, UserTbl } from '@dto'
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
        chai.spy.on(coreUser.userDto, 'userTblFromModel', () => <UserTbl>{})
        chai.spy.on(coreUser.userDb, 'insert', () => 1)
        const res = await coreUser.signup(<UserSignupModel>{nickname: 'not exist', email: 'not exist', password: 'pass', avatar: {picture_id: 'id'}})
        expect(res).to.be.eq(1)
    })

    it('login need confirm', async () => {
        chai.spy.on(coreUser, 'loginAllFieldRequired', () => true)
        chai.spy.on(coreUser, 'getUserIfExist', () => true)
        chai.spy.on(coreUser, 'checkIfNeedConfirmation', () => 'ok')
        // confirmation required
        const login = await coreUser.login(<LoginModel>{email: 'name@email.com', password: 'pass'})
        expect(login).to.be.eq('ok')
    })

    it('login return token', async () => {
        chai.spy.on(coreUser, 'loginAllFieldRequired', () => true)
        chai.spy.on(coreUser, 'getUserIfExist', () => true)
        chai.spy.on(coreUser, 'checkIfNeedConfirmation', () => undefined)
        chai.spy.on(coreUser, 'getTokenIfPassOk', () => 'ok')
        const login = await coreUser.login(<LoginModel>{email: 'name@email.com', password: 'pass'})
        expect(login).to.be.eq('ok')
    })

})
