import { FormGroup } from '@angular/forms'

export class BaseFormModel {

    formGroup: FormGroup = new FormGroup({})

    public isFieldValid() {
        this.formGroup.markAllAsTouched()
        return this.formGroup.touched && this.formGroup.valid
    }

}
