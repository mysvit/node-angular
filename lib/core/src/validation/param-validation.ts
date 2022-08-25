import { ErrorApi500, ErrorsMsg, StringHelper, Validation } from '@shared'

export namespace ParamValidation {

    // check if this is uuid
    export function validateId(uuID: string) {
        if (!Validation.isUUIDValid(uuID)) {
            throw new ErrorApi500(StringHelper.format(ErrorsMsg.IdHasInvalidUuid, uuID))
        }
    }

    // check if all property not empty
    export function allFieldRequired(obj: Object) {
        if (!Validation.isAllPropertyHaveValues(obj)) {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        }
    }

    // check if this is uuid
    export function validateVerificationCodeFormat(verification_code: string) {
        if (!Validation.isVerificationCodeValid(verification_code)) {
            throw new ErrorApi500(ErrorsMsg.VerificationCodeWrongFormat)
        }
    }

}
