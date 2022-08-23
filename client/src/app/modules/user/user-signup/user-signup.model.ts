import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'

export class UserSignupModel {

    email: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an email.'),
        FieldValidators.email('Not a valid email.')
    ])
    nickname: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an name.'),
        FieldValidators.nickname('Name should contain minimum three characters, letters and numbers with doth, space or underscore.')
    ])
    password: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.'),
        FieldValidators.password('Password should contain minimum eight characters, at least one letter and one number.')
    ])
    confirm: FormControl = new FormControl(undefined, [
        FieldValidators.match(this.password, 'Those password did not match.')
    ])

    formGroup: FormGroup = new FormGroup({
            email: this.email,
            nickname: this.nickname,
            password: this.password,
            confirm: this.confirm
        }
    )

}
