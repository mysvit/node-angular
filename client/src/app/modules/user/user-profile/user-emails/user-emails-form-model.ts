import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'

export class UserEmailsFormModel {

    email: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an email.'),
        FieldValidators.email('Not a valid email.')
    ])

    confirmEmail: FormControl = new FormControl(undefined, [
        FieldValidators.match(this.email, 'Those password did not match.')
    ])

    formGroup: FormGroup = new FormGroup({
            email: this.email,
            confirmEmail: this.confirmEmail
        }
    )

}
