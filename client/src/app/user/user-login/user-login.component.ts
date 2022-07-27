import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

    email = new FormControl('', [Validators.required])
    password = new FormControl('', [Validators.required])

    constructor() {
    }

    getEmailErrorMessage() {
        return 'You must enter a username or email address!'
    }

    getPasswordErrorMessage() {
        return 'You must enter a password!'
    }

    ngOnInit(): void {
    }

}
