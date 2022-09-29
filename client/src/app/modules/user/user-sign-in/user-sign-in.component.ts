import { Location } from '@angular/common'
import { Component, Injector, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SignInModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserSignInFormModel } from './user-sign-in-form-model'
import { UserSignInService } from './user-sign-in.service'

@Component({
    selector: 'app-user-sign-in',
    templateUrl: './user-sign-in.component.html',
    styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    formModel = new UserSignInFormModel()

    constructor(
        injector: Injector,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private userSignIn: UserSignInService
    ) {
        super(injector)
    }

    ngOnInit() {
        this.formModel.email.setValue(SlStorage.email)
    }

    signInClick() {
        if (this.formModel.isFieldValid()) {
            this.execute(
                this.userSignIn.signIn(<SignInModel>{
                    email: this.formModel.email.value,
                    password: this.formModel.password.value
                }, this.activatedRoute)
            )
        }
    }

    forgotPasswordClick() {
        this.router.navigate([ClientPath.forgot_password], {relativeTo: this.activatedRoute}).finally()
    }

    signupClick() {
        this.router.navigate([ClientPath.slash + ClientPath.signup]).finally()
    }

}
