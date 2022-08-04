import { environment } from '@env'
import { ApiPath, ErrorApi500, ErrorsMsg, StringHelper } from '@shared'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { app } from '../../server'
import { userCore } from '../ref/core'
import { logger } from '../ref/logger'

const {sign} = jwt

const expect = chai.expect
chai.use(chaiHttp)

describe('ErrorHandler', () => {

    const agent = chai.request.agent(app())

    it('not found path 404 - for authenticated route', async () => {
        const nonExistentRoute = '/nonExistentAuthenticatedRoute'
        const token = sign({user_id: 'user_test_uuid'}, environment.token_key, {expiresIn: '60s'})
        const res = await agent.get(nonExistentRoute).set({'user_id': 'user_test_uuid', 'authorization': 'Bearer ' + token})
        expect(res).to.have.status(StatusCodes.NOT_FOUND)
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal(StringHelper.format(ErrorsMsg.RouteNotFound, nonExistentRoute))
    })

    it('Centralized error handling: apiHandler' + ApiPath.api + ApiPath.user_login, async () => {
        chai.spy.on(userCore, 'login', () => {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        })
        chai.spy.on(logger, 'error', () => true)
        const res = await agent
            .post(ApiPath.api + ApiPath.user_login)
            .type('form')
            .send({})
        expect(res).to.have.status(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res.body.message).to.equal(ErrorsMsg.AllFieldsRequired)
    })

})
