import { ErrorsMsg, StringHelper } from '@shared'
import { expect } from 'chai'
import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { ParamValidation } from './param-validation'

describe('ParamValidation', () => {

    it('validateId valid', () => {
        const goodUUID = randomUUID()
        ParamValidation.validateUuId(goodUUID)
        expect(true).to.be.true
    })

    it('validateId NOT valid', () => {
        const badUUID = 'abra kadabra'
        try {
            ParamValidation.validateUuId(badUUID)
            expect(true).to.be.false
        } catch (error) {
            expect(error.statusCode).to.eq(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.message).to.eq(StringHelper.format(ErrorsMsg.IdHasInvalidUuid, badUUID))
        }
    })

    it('allFieldRequired valid', () => {
        const obj = {user: 'user', password: 'pass'}
        ParamValidation.allFieldRequired(obj)
        expect(true).to.be.true
    })

    it('allFieldRequired NOT valid', () => {
        const obj = {user: 'user', password: ''}
        try {
            ParamValidation.allFieldRequired(obj)
            expect(true).to.be.false
        } catch (error) {
            expect(error.statusCode).to.eq(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.message).to.eq(ErrorsMsg.AllFieldsRequired)
        }
    })

    it('isVerificationCodeValid valid', () => {
        const code = '12345'
        ParamValidation.validateVerificationCodeFormat(code)
        expect(true).to.be.true
    })

    it('isVerificationCodeValid NOT valid', () => {
        try {
            const code = '1234H'
            ParamValidation.validateVerificationCodeFormat(code)
            expect(true).to.be.false
        } catch (error) {
            expect(error.statusCode).to.eq(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.message).to.eq(ErrorsMsg.VerificationCodeWrongFormat)
        }
    })

})
