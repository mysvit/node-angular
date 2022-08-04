import { environment } from '@env'
import { ErrorsMsg } from '@shared'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { app } from '../../server'

const {sign} = jwt
const expect = chai.expect
chai.use(chaiHttp)

describe('Middleware', () => {

    const agent = chai.request.agent(app())

    it('verifyToken - FORBIDDEN: not user_id or authorization header', async () => {
        const notUser = await agent.get('').set({'authorization': 'Bearer 1111111111111111'})
        expect(notUser).to.have.status(StatusCodes.FORBIDDEN)
        expect(notUser.body.message).to.equal(ErrorsMsg.TokenRequired)

        const notAuthorization = await agent.get('').set({'user_id': 'user_test_uuid'})
        expect(notAuthorization).to.have.status(StatusCodes.FORBIDDEN)
        expect(notAuthorization.body.message).to.equal(ErrorsMsg.TokenRequired)
    })

    it('verifyToken - UNAUTHORIZED: bad token', async () => {
        const token = sign({user_id: 'user_test_uuid'}, environment.token_key, {expiresIn: '60s'})
        const badToken = await agent.get('').set({'user_id': 'user_test_uuid', 'authorization': 'Bearer _______BAD_TOKEN______'})
        expect(badToken).to.have.status(StatusCodes.UNAUTHORIZED)
        expect(badToken.body.message).to.equal(ErrorsMsg.InvalidToken)

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
