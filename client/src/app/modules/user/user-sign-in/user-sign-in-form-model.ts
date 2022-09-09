import { FormControl, FormGroup } from '@angular/forms'
import { BaseFormModel } from '@shared/models/base-form-model'
import { FieldValidators } from '@shared/validators'

export class UserSignInFormModel extends BaseFormModel {

    email: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an username.')
    ])
    password: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.')
    ])

    override formGroup: FormGroup = new FormGroup({
            email: this.email,
            password: this.password
        }
    )

}

