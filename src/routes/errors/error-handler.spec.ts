import chai from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { app } from '../../server.js'

const expect = chai.expect
chai.use(chaiHttp)

describe('ErrorHandler', () => {

    it('returns a 404 response', (done) => {
        chai.request(app())
            .get('/nonexistentroute')
            .end((err, res) => {
                expect(res).to.have.status(StatusCodes.NOT_FOUND)
                expect(res.body).to.be.an('object')
                expect(res.body.message).to.equal(`Route [/nonexistentroute] not found.`)
                done()
            })
    })

})
