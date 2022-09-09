import { FormControl, FormGroup } from '@angular/forms'
import { BaseFormModel } from '@shared/models/base-form-model'
import { FieldValidators } from '@shared/validators'

export class UserPublicProfileFormModel extends BaseFormModel {

    nickname: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter an name.'),
        FieldValidators.nickname('Name should contain minimum three characters, letters and numbers with doth or underscore.')
    ])

    avatarId: FormControl = new FormControl('')

    override formGroup: FormGroup = new FormGroup({
            nickname: this.nickname,
            avatarId: this.avatarId
        }
    )

}
