import { FormControl, FormGroup } from '@angular/forms'
import { CommentsTbl } from '@dto'
import { BaseFormModel } from '@shared/models/base-form-model'
import { FieldValidators } from '@shared/validators'

export class HomeCommentsFormModel extends BaseFormModel {

    commentsTbl: CommentsTbl = <CommentsTbl>{}

    comment: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a comment.')
    ])
    commentValue: string = ''

    override formGroup: FormGroup = new FormGroup({
            comment: this.comment
        }
    )

}
