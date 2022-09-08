import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { ResetPassModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserLoginService } from '../user-login.service'
import { UserResetPasswordModel } from './user-reset-password-model'

@Component({
    selector: 'app-user-reset-password',
    templateUrl: './user-reset-password.component.html',
    styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    resetModel = new UserResetPasswordModel()
    email = SlStorage.email

    constructor(
        private router: Router,
        private userLogin: UserLoginService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    ngOnInit(): void {
    }

    resetPasswordClick() {
        this.resetModel.formGroup.markAllAsTouched()
        if (this.resetModel.formGroup.touched && this.resetModel.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userLogin.resetPass(<ResetPassModel>{
                    email: this.email,
                    resetPassCode: this.resetModel.resetCode.value,
                    password: this.resetModel.password.value
                })
            )
        }
    }

    override processCompleted() {
        super.processCompleted()
        this.router.navigate([ClientPath.login]).finally(() =>
            this.snackBar.show('New password set up. Try to log in.', MessageType.Success, 5000))
    }

}
