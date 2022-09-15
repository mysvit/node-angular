import { FormControl, FormGroup } from '@angular/forms'
import { BaseFormModel } from '@shared/models/base-form-model'
import { FieldValidators } from '@shared/validators'

export class UserResetPasswordFormModel extends BaseFormModel {

    resetCode: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an reset code.'),
        FieldValidators.resetCodeFormat('Not a valid code.')
    ])
    password: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.'),
        FieldValidators.password('Password should contain minimum eight characters, at least one letter and one number.')
    ])
    confirm: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.'),
        FieldValidators.match(this.password, 'Those password did not match.')
    ])

    override formGroup: FormGroup = new FormGroup({
            resetCode: this.resetCode,
            password: this.password,
            confirm: this.confirm
        }
    )

}
