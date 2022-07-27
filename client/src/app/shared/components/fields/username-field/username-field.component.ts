import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-username-field',
    templateUrl: './username-field.component.html',
    styleUrls: ['./username-field.component.scss']
})
export class UsernameFieldComponent implements OnInit {

    formControl = new FormControl('', [Validators.required])

    constructor() {
    }

    getErrorMessage() {
        if (this.formControl.hasError('required')) {
            return 'You must enter a username'
        }
        return ''
    }

    ngOnInit(): void {
    }

}
