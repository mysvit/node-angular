import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { ClientPath } from '@shared-lib/constants'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserLoginService } from '../user-login.service'
import { UserForgotPasswordModel } from './user-forgot-password-model'

@Component({
    selector: 'app-user-forgot-password',
    templateUrl: './user-forgot-password.component.html',
    styleUrls: ['./user-forgot-password.component.scss']
})
export class UserForgotPasswordComponent extends ProcessForm {

    FieldValidators = FieldValidators
    forgotModel = new UserForgotPasswordModel()

    constructor(
        private router: Router,
        private userLogin: UserLoginService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    ngOnInit() {
        this.forgotModel.email.setValue(SlStorage.email)
    }

    forgotClick() {
        this.forgotModel.formGroup.markAllAsTouched()
        if (this.forgotModel.formGroup.touched && this.forgotModel.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userLogin.resetPass(this.forgotModel.email.value)
            )
        }
    }

    override processCompleted() {
        super.processCompleted()
        this.snackBar.dismiss()
        this.router
            .navigate([ClientPath.completed],
                {
                    state: {message: 'Check your email and click on reset password link.'}
                }
            )
            .finally()
    }

}
