import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@static/validators'

export class UserLoginModel {

    username: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an username.')
    ])
    password: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.')
    ])

    formGroup: FormGroup = new FormGroup({
            username: this.username,
            password: this.password
        }
    )

}
