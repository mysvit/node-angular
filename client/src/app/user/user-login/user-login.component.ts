import { Component, OnInit } from '@angular/core'
import { FieldValidators } from '@shared/validators'
import { UserLoginModel } from './user-login-model'

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

    userLogin = new UserLoginModel()
    FieldValidators = FieldValidators

    constructor() {
    }

    ngOnInit(): void {
    }

    loginClick() {
        this.userLogin.formGroup.markAllAsTouched()
        console.debug(this.userLogin.formGroup.touched, this.userLogin.formGroup.valid)
    }
}
