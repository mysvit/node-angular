import { StringHelper, Validation } from '@shared/shared.js'
import { ErrorApi500 } from '../errors/error-api.js'

export const messageInvalidUUID: string = 'ID has invalid uuid format [{0}]'

export class ApiValidation {

    // check if this is uuid
    static validateId(uuID: string) {
        if (!Validation.isValidUUID(uuID)) {
            throw new ErrorApi500(StringHelper.format(messageInvalidUUID, uuID))
        }
    }

}