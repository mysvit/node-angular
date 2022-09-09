import { FormControl, FormGroup } from '@angular/forms'
import { BaseFormModel } from '@shared/models/base-form-model'
import { FieldValidators } from '@shared/validators'

export class UserForgotPasswordFormModel extends BaseFormModel {

    email: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an email.'),
        FieldValidators.email('Not a valid email.')
    ])

    override formGroup: FormGroup = new FormGroup({
            email: this.email
        }
    )

}
