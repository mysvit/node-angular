import { ApiPath } from '@shared'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiSpies from 'chai-spies'
import { afterEach } from 'mocha'
import { app } from '../../../server'
import { userCore } from '../../ref/core'

const expect = chai.expect
chai.use(chaiHttp)
chai.use(chaiSpies)

// test route path and called method
describe('ApiUser', () => {

    const agent = chai.request.agent(app())

    afterEach(() => {
        chai.spy.restore(userCore)
    })

    it('GET ' + ApiPath.api + ApiPath.user_getProfile, async () => {
        const spy = chai.spy.on(userCore, 'getById', () => true)
        await agent
            .get(ApiPath.api + ApiPath.user_getProfile)
            .query({user_id: 'uuid'})
        expect(spy).to.have.been.called()
    })

    it('POST ' + ApiPath.api + ApiPath.user_signup, async () => {
        const spy = chai.spy.on(userCore, 'signup', () => true)
        await agent
            .post(ApiPath.api + ApiPath.user_signup)
            .type('form')
            .send({})
        expect(spy).to.have.been.called()
    })

    it('POST ' + ApiPath.api + ApiPath.user_login, async () => {
        const spy = chai.spy.on(userCore, 'login', () => true)
        await agent
            .post(ApiPath.api + ApiPath.user_login)
            .type('form')
            .send({})
        expect(spy).to.have.been.called()
    })

})
