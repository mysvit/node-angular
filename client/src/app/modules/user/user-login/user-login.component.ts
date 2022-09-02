import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { LoginModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { StringHelper } from '@shared-lib/helpers'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserLoginModel } from './user-login-model'
import { UserLoginService } from './user-login.service'

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    loginModel = new UserLoginModel()

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private userLogin: UserLoginService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    ngOnInit() {
        this.loginModel.email.setValue(SlStorage.email)
    }

    loginClick() {
        this.loginModel.formGroup.markAllAsTouched()
        if (this.loginModel.formGroup.touched && this.loginModel.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userLogin.login(<LoginModel>{
                    email: this.loginModel.email.value,
                    password: this.loginModel.password.value
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
