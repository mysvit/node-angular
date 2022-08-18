import { Location } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { LoginModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { ProcessForm } from '@static/form'
import { FieldValidators } from '@static/validators'
import { switchMap } from 'rxjs'
import { UserLoginModel } from './user-login-model'
import { UserLoginService } from './user-login.service'

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent extends ProcessForm {

    FieldValidators = FieldValidators
    model = new UserLoginModel()

    constructor(
        private router: Router,
        private location: Location,
        private userLogin: UserLoginService,
        private states: StatesService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    loginClick() {
        this.model.formGroup.markAllAsTouched()
        if (this.model.formGroup.touched && this.model.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userLogin.login(<LoginModel>{email: this.model.email.value, password: this.model.password.value})
                    .pipe(
                        switchMap(() => this.states.getUserProfileShort())
                    )
            )
        }
    }

    override processCompleted() {
        super.processCompleted()
        this.router.navigate([ClientPath.one_level_back]).finally()
    }

    signupClick() {
        this.router.navigate([ClientPath.signup]).finally()
    }

    forgotPasswordClick() {
        this.router.navigate([ClientPath.forgot_password]).finally()
    }

}
