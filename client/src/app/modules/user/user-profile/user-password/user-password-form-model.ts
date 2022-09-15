import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'

export class UserPasswordFormModel {

    currentPassword: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.')
    ])

    newPassword: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.'),
        FieldValidators.password('Password should contain minimum eight characters, at least one letter and one number.')
    ])
    confirm: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a password.'),
        FieldValidators.match(this.newPassword, 'Those password did not match.')
    ])

    formGroup: FormGroup = new FormGroup({
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirm: this.confirm
        }
    )

}
