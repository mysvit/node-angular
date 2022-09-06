import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { Validation } from '@shared-lib/validation'

export namespace FieldValidators {

    export function errorMessage(formControl: FormControl, isMultipleMessage = false) {
        let message = ''
        for (const validationName in formControl.errors) {
            if (isMultipleMessage) {
                message += formControl.errors[validationName]['errorMessage'] + ' '
            } else {
                message = formControl.errors[validationName]['errorMessage']
                break
            }
        }
        return message
    }

    export function required(errorMessage: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return !!control.value ? null : {
                required: {
                    valid: false,
                    errorMessage: errorMessage
                }
            }
        }
    }

    export function email(errorMessage: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return Validation.isEmailValid(control.value) ? null : {
                email: {
                    valid: false,
                    errorMessage: errorMessage
                }
            }
        }
    }

    export function nickname(errorMessage: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return Validation.isNicknameValid(control.value) ? null : {
                email: {
                    valid: false,
                    errorMessage: errorMessage
                }
            }
        }
    }

    export function match(second: FormControl, errorMessage: string): ValidatorFn {
        return (first: AbstractControl): ValidationErrors | null => {
            return first.value === second.value ? null : {
                match: {
                    valid: false,
                    errorMessage: errorMessage
                }
            }
        }
    }

    export function password(errorMessage: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return Validation.isPasswordValid(control.value) ? null : {
                password: {
                    valid: false,
                    errorMessage: errorMessage
                }
            }
        }
    }

    export function verificationCodeFormat(errorMessage: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return Validation.isVerificationCodeValid(control.value) ? null : {
                verificationCode: {
                    valid: false,
                    errorMessage: errorMessage
                }
            }
        }
    }

    export function resetCodeFormat(errorMessage: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return Validation.isUUIDValid(control.value, false) ? null : {
                resetCode: {
                    valid: false,
                    errorMessage: errorMessage
                }
            }
        }
    }

}
