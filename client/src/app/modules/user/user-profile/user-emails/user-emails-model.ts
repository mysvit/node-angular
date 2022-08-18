import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'

export class UserEmailsModel {

    email: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an email.'),
        FieldValidators.email('Not a valid email.')
    ])
    username: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an username.'),
        FieldValidators.username('Username should contain minimum three characters, letters and numbers with doth or underscore.')
    ])
    password: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.'),
        FieldValidators.password('Password should contain minimum eight characters, at least one letter and one number.')
    ])

    formGroup: FormGroup = new FormGroup({
            email: this.email,
            password: this.password
        }
    )

}
