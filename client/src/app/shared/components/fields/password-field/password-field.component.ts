import { Component, Input, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-password-field',
    templateUrl: './password-field.component.html',
    styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit {

    @Input() label: string = 'Password'

    formControl = new FormControl('', [Validators.required])

    constructor() {
    }

    getErrorMessage() {
        if (this.formControl.hasError('required')) {
            return 'Enter a password'
        }
        return ''
    }

    ngOnInit(): void {
    }

}
