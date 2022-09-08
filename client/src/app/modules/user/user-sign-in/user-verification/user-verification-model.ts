import { FormControl, FormGroup } from '@angular/forms'
import { ErrorsMsg } from '@shared-lib/translation'
import { FieldValidators } from '@shared/validators'


export class UserVerificationModel {

    verificationCode: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a verification code.'),
        FieldValidators.verificationCodeFormat(ErrorsMsg.VerificationCodeWrongFormat)
    ])

    formGroup: FormGroup = new FormGroup({
            verificationCode: this.verificationCode
        }
    )

}
