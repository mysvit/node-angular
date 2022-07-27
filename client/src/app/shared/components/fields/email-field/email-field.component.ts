import { Component, Input, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-email-field',
    templateUrl: './email-field.component.html',
    styleUrls: ['./email-field.component.scss']
})
export class EmailFieldComponent implements OnInit {

    @Input() value: string = ''

    formControl = new FormControl('', [Validators.required, Validators.email])

    constructor() {
    }

    getErrorMessage() {
        if (this.formControl.hasError('required')) {
            return 'You must enter an email'
        }

        return this.formControl.hasError('email') ? 'Not a valid email' : ''
    }

    ngOnInit(): void {
        this.formControl.setValue(this.value)
    }

}
