import { FormGroup } from '@angular/forms'
import { FormAction } from '@shared/enum'

export class BaseFormModel {

    formAction: FormAction = FormAction.View
    formGroup: FormGroup = new FormGroup({})

    public isFieldValid() {
        this.formGroup.markAllAsTouched()
        return this.formGroup.touched && this.formGroup.valid
    }

}
