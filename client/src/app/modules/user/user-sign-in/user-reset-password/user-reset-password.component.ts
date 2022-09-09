import { Component, Injector } from '@angular/core'
import { Router } from '@angular/router'
import { ResetPassModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserSignInService } from '../user-sign-in.service'
import { UserResetPasswordFormModel } from './user-reset-password-form-model'

@Component({
    selector: 'app-user-reset-password',
    templateUrl: './user-reset-password.component.html',
    styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent extends ProcessForm {

    FieldValidators = FieldValidators
    formModel = new UserResetPasswordFormModel()
    email = SlStorage.email

    constructor(
        injector: Injector,
        private router: Router,
        private userSignIn: UserSignInService
    ) {
        super(injector)
    }

    resetPasswordClick() {
        if (this.formModel.isFieldValid()) {
            this.execute(
                this.userSignIn.resetPass(<ResetPassModel>{
                    email: this.email,
                    resetPassCode: this.formModel.resetCode.value,
                    password: this.formModel.password.value
                }),
                {completedMessage: 'New password set up. Try to log in.'}
            )
        }
    }

    override processCompleted(message?: any) {
        super.processCompleted(message)
        this.router.navigate([ClientPath.sign_in]).finally()
    }

}
