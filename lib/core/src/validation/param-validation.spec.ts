import { StringHelper } from '@shared/index.js'
import { ErrorsMsg } from '@shared/translation/errors-msg.js'
import { expect } from 'chai'
import { randomUUID } from 'crypto'
import { ParamValidation } from './param-validation.js'

describe('ApiValidation', () => {

    it('validateId valid', () => {
        const goodUUID = randomUUID()
        try {
            ParamValidation.validateId(goodUUID)
            expect(true).to.be.true
        } catch (error) {
            expect(error.message).to.be.empty
        }
    })

    it('validateId not valid', () => {
        const badUUID = 'abra kadabra'
        try {
            ParamValidation.validateId(badUUID)
        } catch (error) {
            expect(error.message).to.eq(StringHelper.format(ErrorsMsg.IdHasInvalidUuid, badUUID))
        }
    })

})