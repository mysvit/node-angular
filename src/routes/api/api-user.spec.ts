import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiSpies from 'chai-spies'
import { afterEach } from 'mocha'
import { app } from '../../server.js'
import { coreUser } from '../core-lib.js'
import { ApiUser } from './api-user.js'

const expect = chai.expect
chai.use(chaiHttp)
chai.use(chaiSpies)

// test route path and called method
describe('ApiUser', () => {

    const agent = chai.request.agent(app())

    afterEach(() => {
        chai.spy.restore(coreUser)
    })

    it('GET /api/user/getById', async () => {
        const getById = chai.spy.on(coreUser, 'getById', () => true)
        await agent
            .get('/api/user/getById')
            .query({user_id: 'uuid'})
        expect(getById).to.have.been.called()
    })

    it('POST /api/user/add', async () => {
        const add = chai.spy.on(coreUser, 'add', () => true)
        await agent
            .post('/api/user/add')
            .type('form')
            .send({})
        expect(add).to.have.been.called()
    })

})