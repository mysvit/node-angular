import { expect } from 'chai'
import { randomUUID } from 'crypto'
import { Validation } from './validation.js'

describe('Validation', () => {

    it('isValidUUID valid', () => {
        const user_id = randomUUID()
        expect(Validation.isValidUUID(user_id)).to.true
    })

    it('isValidUUID not valid', () => {
        expect(Validation.isValidUUID('bad uuid')).to.false
    })

})
