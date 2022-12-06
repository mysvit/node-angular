import { FormControl, FormGroup } from '@angular/forms'
import { BaseFormModel } from '@shared/models/base-form-model'
import { FieldValidators } from '@shared/validators'

export class CommentFormModel extends BaseFormModel {

    commentId: FormControl = new FormControl()
    parentId: FormControl = new FormControl()
    comment: FormControl = new FormControl(undefined, [
        FieldValidators.required('You must enter a comment.')
    ])

    override formGroup: FormGroup = new FormGroup({
            commentId: this.commentId,
            parentId: this.parentId,
            comment: this.comment
        }
    )

}
