import { Component, Injector } from '@angular/core'
import { Router } from '@angular/router'
import { ClientPath } from '@shared-lib/constants'
import { ValueHelper } from '@shared-lib/helpers'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { UserSignInService } from '../user-sign-in.service'
import { UserVerificationFormModel } from './user-verification-form-model'

@Component({
    selector: 'app-user-verification',
    templateUrl: './user-verification.component.html',
    styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent extends ProcessForm {

    FieldValidators = FieldValidators
    formModel = new UserVerificationFormModel()

    constructor(
        injector: Injector,
        private router: Router,
        private userSignIn: UserSignInService
    ) {
        super(injector)
    }

    verifyClick() {
        if (ValueHelper.isEmpty(SlStorage.user_id)) {
            this.router.navigate([ClientPath.slash + ClientPath.sign_in]).finally()
            return
        }
        if (this.formModel.isFieldValid()) {
            this.execute(
                this.userSignIn.verifyCode(this.formModel.verificationCode.value)
            )
        }
    }

    resendClick() {
        this.execute(
            this.userSignIn.resendCode()
                .pipe(
                    map((isSent) => isSent === 1
                        ? this.snackBar?.show('Check your email to get the verification code.', MessageType.Success)
                        : this.snackBar?.show('Error happened during sending the verification code.', MessageType.Error)
                    )
                )
        )
    }

}
