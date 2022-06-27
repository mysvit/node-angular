import { User } from '@dto/dto.js'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiSpies from 'chai-spies'
import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { afterEach } from 'mocha'
import { app } from '../../server.js'
import { coreUser } from '../core-lib.js'
import { ApiUser } from './api-user.js'
import { ApiValidation } from './api-validation.js'

const expect = chai.expect
chai.use(chaiHttp)
chai.use(chaiSpies)

describe('ApiUser', () => {
    afterEach(() => {
        chai.spy.restore(ApiValidation)
    })

    // test input parameters
    it('GET /api/user/get', (done) => {
        const uuid = randomUUID()

        chai.spy.on(coreUser, 'getById', (user_id: string) => {
            return Promise.race([{user_id: user_id}])
        })

        chai.request(app())
            .get(`/api/user/get?user_id=${uuid}`)
            .end((err, res) => {
                expect(res).to.have.status(StatusCodes.OK)
                expect(res.body).to.be.an('Object')
                expect(res.body.user_id).to.equal(uuid)
                done()
            })
    })

    // test input parameters
    it('POST /api/user/add', (done) => {
        const user = {user_name: 'User name', user_email: 'my@email.com', user_pass: 'passHash'}

        chai.spy.on(coreUser, 'add', (user: User) => {
            return Promise.race([user])
        })

        chai.request(app())
            .post('/api/user/add')
            .type('form')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(StatusCodes.OK)
                expect(res.body).to.be.an('Object')
                expect(res.body).to.deep.equal(user)
                done()
            })
    })

})