import { FormControl, FormGroup } from '@angular/forms'
import { FieldValidators } from '@shared/validators'

export class UserPublicProfileModel {

    nickname: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an name.'),
        FieldValidators.nickname('Name should contain minimum three characters, letters and numbers with doth or underscore.')
    ])

    avatar: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an username.'),
        FieldValidators.nickname('Username should contain minimum three characters, letters and numbers with doth or underscore.')
    ])

    formGroup: FormGroup = new FormGroup({
            nickname: this.nickname,
            avatar: this.avatar
        }
    )

}
