import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@static/validators'

export class UserPublicProfileModel {

    username: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an username.'),
        FieldValidators.username('Username should contain minimum three characters, letters and numbers with doth or underscore.')
    ])

    avatar: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an username.'),
        FieldValidators.username('Username should contain minimum three characters, letters and numbers with doth or underscore.')
    ])

    formGroup: FormGroup = new FormGroup({
            username: this.username,
            avatar: this.avatar
        }
    )

}
