import { ErrorsMsg, StringHelper } from '@shared'
import { expect } from 'chai'
import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { ParamValidation } from './param-validation'

describe('ParamValidation', () => {

    it('validateId valid', () => {
        const goodUUID = randomUUID()
        try {
            ParamValidation.validateId(goodUUID)
            expect(true).to.be.true
        } catch (error) {
            expect(error.message).to.be.empty
        }
    })

    it('validateId NOT valid', () => {
        const badUUID = 'abra kadabra'
        try {
            ParamValidation.validateId(badUUID)
        } catch (error) {
            expect(error.statusCode).to.eq(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.message).to.eq(StringHelper.format(ErrorsMsg.IdHasInvalidUuid, badUUID))
        }
    })

    it('allFieldRequired valid', () => {
        const obj = {user: 'user', password: 'pass'}
        try {
            ParamValidation.allFieldRequired(obj)
            expect(true).to.be.true
        } catch (error) {
            expect(error.statusCode).to.eq(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.message).to.eq(ErrorsMsg.AllFieldsRequired)
        }
    })

    it('allFieldRequired NOT valid', () => {
        const obj = {user: 'user', password: ''}
        try {
            ParamValidation.allFieldRequired(obj)
            expect(true).to.be.true
        } catch (error) {
            expect(error.statusCode).to.eq(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.message).to.eq(ErrorsMsg.AllFieldsRequired)
        }
    })

})
