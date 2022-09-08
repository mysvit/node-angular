import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { ClientPath } from '@shared-lib/constants'
import { StringHelper } from '@shared-lib/helpers'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserSignInService } from '../user-sign-in.service'
import { UserForgotPasswordModel } from './user-forgot-password-model'

@Component({
    selector: 'app-user-forgot-password',
    templateUrl: './user-forgot-password.component.html',
    styleUrls: ['./user-forgot-password.component.scss']
})
export class UserForgotPasswordComponent extends ProcessForm {

    FieldValidators = FieldValidators
    forgotModel = new UserForgotPasswordModel()
    parenUrl: string = ''

    constructor(
        private router: Router,
        private userSignIn: UserSignInService,
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
                this.userSignIn.forgotPass(this.forgotModel.email.value)
            )
        }
    }

    override processCompleted() {
        super.processCompleted()
        this.router.navigate([StringHelper.removeSlash(ClientPath.sign_in), StringHelper.removeSlash(ClientPath.reset_password)])
            .finally(() =>
                this.snackBar.show('Check your email to get reset password code.', MessageType.Success, 5000)
            )
    }

}
