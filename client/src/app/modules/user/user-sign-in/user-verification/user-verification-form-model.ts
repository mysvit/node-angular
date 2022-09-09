import { FormControl, FormGroup } from '@angular/forms'
import { ErrorsMsg } from '@shared-lib/translation'
import { BaseFormModel } from '@shared/models/base-form-model'
import { FieldValidators } from '@shared/validators'


export class UserVerificationFormModel extends BaseFormModel {

    verificationCode: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a verification code.'),
        FieldValidators.verificationCodeFormat(ErrorsMsg.VerificationCodeWrongFormat)
    ])

    override formGroup: FormGroup = new FormGroup({
            verificationCode: this.verificationCode
        }
    )

}
