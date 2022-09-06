import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'

export class UserResetPasswordModel {

    resetCode: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an reset code.'),
        FieldValidators.resetCodeFormat('Not a valid code.')
    ])
    password: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.'),
        FieldValidators.password('Password should contain minimum eight characters, at least one letter and one number.')
    ])
    confirm: FormControl = new FormControl(undefined, [
        FieldValidators.match(this.password, 'Those password did not match.')
    ])

    formGroup: FormGroup = new FormGroup({
            resetCode: this.resetCode,
            password: this.password,
            confirm: this.confirm
        }
    )

}
