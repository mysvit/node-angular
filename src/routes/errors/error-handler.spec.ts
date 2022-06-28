import { StringHelper } from '@shared/helpers/index.js'
import { ErrorsMsg } from '@shared/translation/errors-msg.js'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { app } from '../../server.js'

const expect = chai.expect
chai.use(chaiHttp)

describe('ErrorHandler', () => {

    const agent = chai.request.agent(app())

    it('returns a 404 response', async () => {
        const route = '/nonExistentRoute'
        const res = await agent.get(route)
        expect(res).to.have.status(StatusCodes.NOT_FOUND)
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal(StringHelper.format(ErrorsMsg.RouteNotFound, route))
    })

})
