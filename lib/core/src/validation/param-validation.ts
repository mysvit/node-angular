import { ErrorApi500, StringHelper, Validation } from '@shared/shared.js'
import { ErrorsMsg } from '@shared/translation/errors-msg.js'

export class ParamValidation {

    // check if this is uuid
    static validateId(uuID: string) {
        if (!Validation.isValidUUID(uuID)) {
            throw new ErrorApi500(StringHelper.format(ErrorsMsg.IdHasInvalidUuid, uuID))
        }
    }

}