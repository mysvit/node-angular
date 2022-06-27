import { StringHelper } from '@shared/shared.js'
import { ErrorsMsg } from '@shared/translation/errors-msg.js'
import { expect } from 'chai'
import { randomUUID } from 'crypto'
import { ApiValidation } from './api-validation.js'

describe('ApiValidation', () => {

    it('validateId valid', (done) => {
        const goodUUID = randomUUID()
        try {
            ApiValidation.validateId(goodUUID)
            done()
        } catch (error) {
            expect(error).to.be.empty
        }
    })

    it('validateId not valid', () => {
        const badUUID = 'abra kadabra'
        try {
            ApiValidation.validateId(badUUID)
        } catch (error) {
            expect(error.message).to.eq(StringHelper.format(ErrorsMsg.IdHasInvalidUuid, badUUID))
        }
    })

})