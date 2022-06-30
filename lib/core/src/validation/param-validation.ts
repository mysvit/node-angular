import { ErrorApi500, ErrorsMsg, StringHelper, Validation } from '@shared'

export class ParamValidation {

    // check if this is uuid
    static validateId(uuID: string) {
        if (!Validation.isValidUUID(uuID)) {
            throw new ErrorApi500(StringHelper.format(ErrorsMsg.IdHasInvalidUuid, uuID))
        }
    }

}