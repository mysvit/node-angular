import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { ClientPath } from '@shared-lib/constants'
import { ValueHelper } from '@shared-lib/helpers'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserLoginService } from '../user-login.service'
import { UserVerificationModel } from './user-verification-model'

@Component({
    selector: 'app-user-verification',
    templateUrl: './user-verification.component.html',
    styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent extends ProcessForm {

    FieldValidators = FieldValidators
    verifyModel = new UserVerificationModel()

    constructor(
        private router: Router,
        private userLogin: UserLoginService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    verifyClick() {
        if (ValueHelper.isEmpty(SlStorage.user_id)) {
            this.router.navigate([ClientPath.login]).finally()
            return
        }
        this.verifyModel.formGroup.markAllAsTouched()
        if (this.verifyModel.formGroup.touched && this.verifyModel.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userLogin.verifyCode(SlStorage.user_id, this.verifyModel.verificationCode.value)
            )
        }
    }

    resendClick() {
        this.execute(this.userLogin.resendCode(SlStorage.user_id))
    }

}
