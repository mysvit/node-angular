import { expect } from 'chai'
import { randomUUID } from 'crypto'
import { getValidId } from './validation.js'

describe('Simple', () => {

    it('getValidId valid', () => {
        const user_id = randomUUID()
        expect(getValidId(user_id)).to.eql(user_id)
    })
    it('getValidId not valid', () => {
        expect(getValidId('bad uuid')).to.eql('')
    })

})
