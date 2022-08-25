import { FormControl, FormGroup } from '@angular/forms'
import { ErrorsMsg } from '@shared-lib/translation'
import { FieldValidators } from '@shared/validators'


export class UserVerificationModel {

    verification_code: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a verification code.'),
        FieldValidators.verificationCodeFormat(ErrorsMsg.VerificationCodeWrongFormat)
    ])

    formGroup: FormGroup = new FormGroup({
            verify_code: this.verification_code
        }
    )

}
