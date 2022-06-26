import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiSpies from 'chai-spies'
import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { after } from 'mocha'
import { coreUser } from './core.js'
import { app } from '../../server.js'
import { ApiUser } from './api-user.js'
import { ApiValidation } from './api-validation.js'

const expect = chai.expect
chai.use(chaiHttp)
chai.use(chaiSpies)

describe('ApiUser', () => {
    after(() => {
        chai.spy.restore(ApiValidation)
    })

    it('GET /api/user/get', (done) => {
        const uuid = randomUUID()

        chai.spy.on(coreUser, 'getById', (user_id: string) => {
            return Promise.all([{user_id: user_id}])
        })

        chai.request(app()).get(`/api/user/get?user_id=${uuid}`).end((err, res) => {
            expect(res).to.have.status(StatusCodes.OK)
            expect(res.body).to.be.an('Array')
            expect(res.body[0].user_id).to.equal(uuid)
            done()
        })
    })

})