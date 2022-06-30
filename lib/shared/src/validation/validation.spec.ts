import chai from 'chai'
import { randomUUID } from 'crypto'
import { Validation } from './validation'

const expect = chai.expect

describe('Validation', () => {

    it('isValidUUID valid', () => {
        const user_id = randomUUID()
        expect(Validation.isValidUUID(user_id)).to.be.true
    })

    it('isValidUUID not valid', () => {
        expect(Validation.isValidUUID('bad uuid')).to.be.false
    })

})
