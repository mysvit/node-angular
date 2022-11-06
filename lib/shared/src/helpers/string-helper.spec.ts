import { expect } from 'chai'
import { StringHelper } from './string-helper'

describe('StringHelper', () => {

    it('format 0', () => {
        expect(StringHelper.format('test {0}', 0)).to.be.eq('test 0')
    })

    it('0 format 0', () => {
        expect(StringHelper.format('{0} test {0}', 0)).to.be.eq('0 test 0')
    })

    it('1 format 0', () => {
        expect(StringHelper.format('{1} test {0}', 0, 1)).to.be.eq('1 test 0')
    })


    it('addZero 1', () => {
        expect(StringHelper.addZero('1', 2)).to.be.eq('01')
    })

    it('addZero 10', () => {
        expect(StringHelper.addZero('12', 2)).to.be.eq('12')
    })

})
