import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'


export class UserForgotPasswordModel {

    email: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an email.'),
        FieldValidators.email('Not a valid email.')
    ])

    formGroup: FormGroup = new FormGroup({
            email: this.email
        }
    )

}
