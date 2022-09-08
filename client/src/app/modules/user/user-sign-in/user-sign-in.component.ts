import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { SignInModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { StringHelper } from '@shared-lib/helpers'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserSignInModel } from './user-sign-in-model'
import { UserSignInService } from './user-sign-in.service'

@Component({
    selector: 'app-user-sign-in',
    templateUrl: './user-sign-in.component.html',
    styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    formModel = new UserSignInModel()

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private userSignIn: UserSignInService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    ngOnInit() {
        this.formModel.email.setValue(SlStorage.email)
    }

    signInClick() {
        this.formModel.formGroup.markAllAsTouched()
        if (this.formModel.formGroup.touched && this.formModel.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userSignIn.signIn(<SignInModel>{
                    email: this.formModel.email.value,
                    password: this.formModel.password.value
                }, this.activatedRoute)
            )
        }
    }

    forgotPasswordClick() {
        this.router.navigate([StringHelper.removeSlash(ClientPath.forgot_password)], {relativeTo: this.activatedRoute}).finally()
    }

    signupClick() {
        this.router.navigate([ClientPath.signup]).finally()
    }

}
