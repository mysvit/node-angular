import { ErrorApi500, ErrorsMsg, StringHelper, Validation, ValueHelper } from '@shared'

export namespace ParamValidation {

    // check if this is uuid
    export function validateId(uuID: string) {
        if (!Validation.isUUIDValid(uuID)) {
            throw new ErrorApi500(StringHelper.format(ErrorsMsg.IdHasInvalidUuid, uuID))
        }
    }

    // check if all property not empty
    export function allFieldRequired(obj: Object) {
        const result = Object.getOwnPropertyNames(obj)
            .map(fieldName => ValueHelper.isEmpty(obj[fieldName]))
            .findIndex(value => value)
        if (result >= 0) {
            throw new ErrorApi500(ErrorsMsg.AllFieldsRequired)
        }
    }

}
