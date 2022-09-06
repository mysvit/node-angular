import chai from 'chai'
import { randomUUID } from 'crypto'
import { Validation } from './validation'

const expect = chai.expect

describe('Validation', () => {

    it('isUUIDValid valid', () => {
        const uuid = randomUUID()
        expect(Validation.isUUIDValid(uuid)).to.be.true
    })
    it('isUUIDValid NOT valid', () => {
        const uuid = randomUUID().replace(/-/g, '')
        expect(Validation.isUUIDValid(uuid, false)).to.be.true
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


    it('isAllPropertyHaveValues valid', () => {
        expect(Validation.isAllPropertyHaveValues({user: 'user', password: 'pass'})).to.be.true
    })
    it('isAllPropertyHaveValues NOT valid', () => {
        expect(Validation.isAllPropertyHaveValues({user: 'user', password: ''})).to.be.false
    })
    it('isAllPropertyHaveValues NOT valid', () => {
        expect(Validation.isAllPropertyHaveValues({user: 'user', password: undefined})).to.be.false
    })


    it('isVerificationCodeValid', () => {
        expect(Validation.isVerificationCodeValid('55555')).to.be.true
    })
    it('isVerificationCodeValid', () => {
        expect(Validation.isVerificationCodeValid('4444')).to.be.false
    })
    it('isVerificationCodeValid', () => {
        expect(Validation.isVerificationCodeValid('1111G')).to.be.false
    })


})
