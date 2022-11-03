import { Component, Injector } from '@angular/core'
import { ClientPath } from '@shared-lib/constants'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserSignInService } from '../user-sign-in.service'
import { UserForgotPasswordFormModel } from './user-forgot-password-form-model'

@Component({
    selector: 'app-user-forgot-password',
    templateUrl: './user-forgot-password.component.html',
    styleUrls: ['./user-forgot-password.component.scss']
})
export class UserForgotPasswordComponent extends ProcessForm {

    FieldValidators = FieldValidators
    formModel = new UserForgotPasswordFormModel()

    constructor(
        injector: Injector,
        private userSignIn: UserSignInService
    ) {
        super(injector)
    }

    ngOnInit() {
        this.formModel.email.setValue(SlStorage.email)
    }

    forgotClick() {
        if (this.formModel.isFieldValid()) {
            this.execute(
                this.userSignIn.forgotPass(this.formModel.email.value),
                {completedMessage: 'Check your email to get reset password code.'}
            )
        }
    }

    override processCompleted(message?: any) {
        super.processCompleted(message)
        this.router.navigate([ClientPath.sign_in, ClientPath.reset_password]).finally()
    }

    resetPasswordClick() {
        if (this.formModel.isFieldValid()) {
            SlStorage.email = this.formModel.email.value
            this.router.navigate([ClientPath.sign_in, ClientPath.reset_password]).finally()
        }
    }

}
