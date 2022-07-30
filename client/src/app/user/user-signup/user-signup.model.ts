import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'

export class UserSignupModel {

    user_email: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an email.'),
        FieldValidators.email('Not a valid email.')
    ])
    user_name: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an username.'),
        FieldValidators.username('Username should contain minimum three characters, letters and numbers with doth or underscore.')
    ])
    user_pass: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.'),
        FieldValidators.password('Password should contain minimum eight characters, at least one letter and one number.')
    ])
    confirm: FormControl = new FormControl(undefined, [
        FieldValidators.match(this.user_pass, 'Those password did not match.')
    ])

    formGroup: FormGroup = new FormGroup({
            email: this.user_email,
            username: this.user_name,
            password: this.user_pass,
            confirm: this.confirm
        }
    )

}
