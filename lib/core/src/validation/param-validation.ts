import { ErrorApi500, ErrorsMsg, StringHelper, Validation } from '@shared'

export namespace ParamValidation {

    // check if this is uuid
    export function validateUuId(uuID: string) {
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
    export function validateVerificationCodeFormat(verificationCode: string) {
        if (!Validation.isVerificationCodeValid(verificationCode)) {
            throw new ErrorApi500(ErrorsMsg.VerificationCodeWrongFormat)
        }
    }

    // check if this is uuid
    export function validateEmail(email: string) {
        if (!Validation.isEmailValid(email)) {
            throw new ErrorApi500(ErrorsMsg.EmailWrongFormat)
        }
    }

}
