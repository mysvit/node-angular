import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'

export class UserLoginModel {

    email: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an username.')
    ])
    password: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.')
    ])

    formGroup: FormGroup = new FormGroup({
            email: this.email,
            password: this.password
        }
    )

}
