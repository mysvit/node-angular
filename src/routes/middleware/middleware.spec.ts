import { environment } from '@env'
import { ErrorsMsg } from '@shared'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { app } from '../../server'
import { Middleware } from './middleware'

const {sign} = jwt
const expect = chai.expect
chai.use(chaiHttp)

describe('Middleware', () => {

    const agent = chai.request.agent(app())

    it('verifyUserId - UserId exist but not Authenticated', async () => {
        let mockRequest: Partial<Request> = {
            headers: {
                'user_id': 'user_test_uuid'
            }
        }
        let mockResponse: Partial<Response> = {}
        let nextFunction: NextFunction = () => {
        }
        Middleware.verifyUserId(mockRequest as Request, mockResponse as Response, nextFunction)
        expect(mockRequest.headers.user_id).to.be.undefined
    })

    it('verifyToken - FORBIDDEN: no userId', async () => {
        const notUser = await agent.get('').set({'authorization': 'Bearer 1111111111111111'})
        expect(notUser).to.have.status(StatusCodes.FORBIDDEN)
        expect(notUser.body.message).to.equal(ErrorsMsg.TokenRequired)
    })

    it('verifyToken - FORBIDDEN: not or bad authorization Bearer', async () => {
        const notAuthorization = await agent.get('').set({'user_id': 'user_test_uuid'})
        expect(notAuthorization).to.have.status(StatusCodes.FORBIDDEN)
        expect(notAuthorization.body.message).to.equal(ErrorsMsg.TokenRequired)
    })

    it('verifyToken - UNAUTHORIZED: bad token', async () => {
        const badToken = await agent.get('').set({'user_id': 'user_test_uuid', 'authorization': 'Bearer _______BAD_TOKEN______'})
        expect(badToken).to.have.status(StatusCodes.UNAUTHORIZED)
        expect(badToken.body.message).to.equal(ErrorsMsg.InvalidToken)
    })

    it('verifyToken - UNAUTHORIZED: bad user id', async () => {
        const token = sign({user_id: 'user_test_uuid'}, environment.token_key, {expiresIn: '60s'})
        const badUserId = await agent.get('').set({'user_id': 'BAD_uuid', 'authorization': 'Bearer ' + token})
        expect(badUserId).to.have.status(StatusCodes.UNAUTHORIZED)
        expect(badUserId.body.message).to.equal(ErrorsMsg.InvalidToken)
    })

    it('verifyToken', async () => {
        const token = sign({user_id: 'user_test_uuid'}, environment.token_key, {expiresIn: '60s'})
        const res = await agent.get('').set({'user_id': 'user_test_uuid', 'authorization': 'Bearer ' + token})
        expect(res).to.have.status(StatusCodes.NOT_FOUND)
    })

})
