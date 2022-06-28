import { expect } from 'chai'
import { isEmpty } from './value-helper.js'

describe('Helper', () => {

    it('isEmpty', () => {
        expect(isEmpty(undefined)).to.true
        expect(isEmpty(null)).to.true
        expect(isEmpty('')).to.true
        expect(isEmpty([])).to.true
        expect(isEmpty({})).to.true
    })
    it('isEmpty Not', () => {
        expect(isEmpty(false)).to.false
        expect(isEmpty(0)).to.false
        expect(isEmpty([1])).to.false
        expect(isEmpty({id: 1})).to.false
    })

})