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
})