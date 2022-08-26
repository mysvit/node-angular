import { Location } from '@angular/common'
import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { AuthModel, AuthType, LoginModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { StringHelper } from '@shared-lib/helpers'
import { ProcessForm } from '@shared/form'
import { Storage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { UserLoginModel } from './user-login-model'
import { UserLoginService } from './user-login.service'

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent extends ProcessForm {


    FieldValidators = FieldValidators
    loginModel = new UserLoginModel()

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private userLogin: UserLoginService,
        private states: StatesService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    loginClick() {
        this.loginModel.formGroup.markAllAsTouched()
        if (this.loginModel.formGroup.touched && this.loginModel.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userLogin.login(<LoginModel>{email: this.loginModel.email.value, password: this.loginModel.password.value})
                    .pipe(
                        map((data: AuthModel) => {
                            Storage.user_id = data.user_id
                            switch (data.authType) {
                                case AuthType.Authenticated:
                                    Storage.token = `Bearer ${data.token}`
                                    Storage.nickname = data.nickname
                                    Storage.avatar_id = data.avatar_id
                                    this.states.isAuth().next(true)
                                    this.router.navigate([ClientPath.one_level_back]).finally()
                                    break
                                case AuthType.NeedVerification:
                                    this.router.navigate([StringHelper.removeSlash(ClientPath.verify)], {relativeTo: this.route}).finally()
                                    break
                            }
                        })
                    )
            )
        }
    }

    forgotPasswordClick() {
        this.router.navigate([ClientPath.forgot_password]).finally()
    }

    signupClick() {
        this.router.navigate([ClientPath.signup]).finally()
    }

}
