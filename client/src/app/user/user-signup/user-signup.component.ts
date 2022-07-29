import { Component, OnInit } from '@angular/core'
import { FieldValidators } from '@shared/validators'
import { UserSignupModel } from './user-signup-model'

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

    userSignup = new UserSignupModel()
    FieldValidators = FieldValidators

    constructor() {
    }

    ngOnInit(): void {
    }

    registerClick() {
        this.userSignup.signupGroup.markAllAsTouched()
        console.debug(this.userSignup.signupGroup.touched, this.userSignup.signupGroup.valid)
    }

}
