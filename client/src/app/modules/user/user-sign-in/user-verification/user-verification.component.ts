import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { ClientPath } from '@shared-lib/constants'
import { ValueHelper } from '@shared-lib/helpers'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { UserSignInService } from '../user-sign-in.service'
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
        private userSignIn: UserSignInService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    verifyClick() {
        if (ValueHelper.isEmpty(SlStorage.user_id)) {
            this.router.navigate([ClientPath.sign_in]).finally()
            return
        }
        this.verifyModel.formGroup.markAllAsTouched()
        if (this.verifyModel.formGroup.touched && this.verifyModel.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userSignIn.verifyCode(SlStorage.user_id, this.verifyModel.verificationCode.value)
            )
        }
    }

    resendClick() {
        this.execute(
            this.userSignIn.resendCode(SlStorage.user_id)
                .pipe(
                    map((isSent) => isSent === 1
                        ? this.snackBar.show('Check your email to get the verification code.', MessageType.Success)
                        : this.snackBar.show('Error happened during sending the verification code.', MessageType.Error)
                    )
                )
        )
    }

}
