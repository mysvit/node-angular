import { FormControl, FormGroup } from '@angular/forms'
import { ErrorsMsg } from '@shared-lib/translation'
import { BaseFormModel } from '@shared/models/base-form-model'
import { FieldValidators } from '@shared/validators'

export class UserEmailFormModel extends BaseFormModel {

    email: FormControl = new FormControl(undefined)

    override formGroup: FormGroup = new FormGroup({
            email: this.email
        }
    )

}

export class NewEmailFormModel extends BaseFormModel {

    newEmail: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an email.'),
        FieldValidators.email('Not a valid email.')
    ])
    confirmEmail: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an email.'),
        FieldValidators.match(this.newEmail, 'New email did not match.')
    ])

    override formGroup: FormGroup = new FormGroup({
            newEmail: this.newEmail,
            confirmEmail: this.confirmEmail
        }
    )

}

export class VerifyFormModel extends BaseFormModel {

    verificationCode: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a verification code.'),
        FieldValidators.verificationCodeFormat(ErrorsMsg.VerificationCodeWrongFormat)
    ])

    override formGroup: FormGroup = new FormGroup({
            verificationCode: this.verificationCode
        }
    )

}
