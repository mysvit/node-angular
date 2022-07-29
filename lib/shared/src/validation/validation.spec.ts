import chai from 'chai'
import { randomUUID } from 'crypto'
import { Validation } from './validation'

const expect = chai.expect

describe('Validation', () => {

    it('isUUIDValid valid', () => {
        const user_id = randomUUID()
        expect(Validation.isUUIDValid(user_id)).to.be.true
    })

    it('isUUIDValid not valid', () => {
        expect(Validation.isUUIDValid('bad uuid')).to.be.false
    })


    it('isPasswordValid valid', () => {
        expect(Validation.isPasswordValid('eight123')).to.be.true
    })

    it('isPasswordValid not number', () => {
        expect(Validation.isPasswordValid('elephant')).to.be.false
    })

    it('isPasswordValid not character', () => {
        expect(Validation.isPasswordValid('12345678')).to.be.false
    })

    it('isPasswordValid less then 8', () => {
        expect(Validation.isPasswordValid('seven77')).to.be.false
    })


    it('isEmailValid valid', () => {
        expect(Validation.isEmailValid('email@domain.com')).to.be.true
    })

    it('isEmailValid not valid domain', () => {
        expect(Validation.isEmailValid('email@domain')).to.be.false
    })

    it('isEmailValid not exist domain', () => {
        expect(Validation.isEmailValid('email@')).to.be.false
    })

})
