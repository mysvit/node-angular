import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../server.js'

const expect = chai.expect
chai.use(chaiHttp)

describe('Errors - IT', () => {

  describe('null route', () => {

    it('returns a 404 response', (done) => {
      chai.request(app())
        .get('/nonexistentroute')
        .end((err, res) => {
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.equal('NOT FOUND')
          done()
        })
    })
  })

})
