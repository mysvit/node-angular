import { Location } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { AuthModel, AuthType } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { ValueHelper } from '@shared-lib/helpers'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { Storage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
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
        private location: Location,
        private userLogin: UserLoginService,
        private states: StatesService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    verifyClick() {
        if (ValueHelper.isEmpty(Storage.user_id)) {
            this.router.navigate([ClientPath.login]).finally()
            return
        }
        this.verifyModel.formGroup.markAllAsTouched()
        if (this.verifyModel.formGroup.touched && this.verifyModel.formGroup.valid) {
            this.snackBar.dismiss()
            this.execute(
                this.userLogin.confirm(Storage.user_id, this.verifyModel.verification_code.value)
                    .pipe(
                        map((data: AuthModel) => {
                            switch (data.authType) {
                                case AuthType.Authenticated:
                                    Storage.token = `Bearer ${data.token}`
                                    Storage.nickname = data.nickname
                                    Storage.avatar_id = data.avatar_id
                                    this.states.isAuth().next(true)
                                    this.router.navigate([ClientPath.one_level_back]).finally(() =>
                                        this.snackBar.show('Verification ok. You logged in to your account.', MessageType.Success)
                                    )
                                    break
                                case AuthType.VerifiedButNotAuth:
                                    this.router.navigate([ClientPath.login]).finally(() =>
                                        this.snackBar.show('Verification ok. Login to your account.', MessageType.Success)
                                    )
                                    break
                            }
                            return data.authType === AuthType.Authenticated
                        })
                    )
            )
        }
    }

}
