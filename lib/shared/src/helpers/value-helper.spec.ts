import { expect } from 'chai'
import { ValueHelper } from './value-helper'

describe('ValueHelper', () => {

    it('isEmpty', () => {
        expect(ValueHelper.isEmpty(undefined)).to.true
        expect(ValueHelper.isEmpty(null)).to.true
        expect(ValueHelper.isEmpty('')).to.true
        expect(ValueHelper.isEmpty([])).to.true
        expect(ValueHelper.isEmpty({})).to.true
    })
    it('isEmpty Not', () => {
        expect(ValueHelper.isEmpty(false)).to.false
        expect(ValueHelper.isEmpty(0)).to.false
        expect(ValueHelper.isEmpty([1])).to.false
        expect(ValueHelper.isEmpty({id: 1})).to.false
    })

})
