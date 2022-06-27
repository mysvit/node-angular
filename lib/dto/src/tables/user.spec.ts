import { expect } from 'chai'
import { User } from './user.js'

describe('User', () => {

    it('id', () => {
        const result = new User({id: '1'})
        expect(result.id).to.equal('1')
    })

    it('property name', () => {
        const result = new User({name: 'abc'})
        expect(result.name).to.equal('abc')
    })
})