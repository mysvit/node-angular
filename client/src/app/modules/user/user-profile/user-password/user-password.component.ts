import { Component, Injector } from '@angular/core'
import { ChangePassModel } from '@dto'
import { ApiParams, ClientPath } from '@shared-lib/constants'
import { SnackBarType } from '@standalone/snack-bar/snack-bar.type'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { UserProfileService } from '../user-profile.service'
import { UserPasswordFormModel } from './user-password-form-model'

@Component({
    selector: 'app-user-password',
    templateUrl: './user-password.component.html',
    styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent extends ProcessForm {

    FieldValidators = FieldValidators
    userPasswordFormModel: UserPasswordFormModel = new UserPasswordFormModel()

    constructor(
        injector: Injector,
        private userProfile: UserProfileService
    ) {
        super(injector)
    }

    changePasswordClick() {
        this.execute(
            this.userProfile
                .changePassword(<ChangePassModel>{
                        currentPass: this.userPasswordFormModel.currentPassword.value,
                        newPass: this.userPasswordFormModel.newPassword.value
                    }
                )
                .pipe(
                    map(() => {
                        SlStorage.isAuth = false
                        SlStorage.remove(ApiParams.token)
                        this.snackBar?.show('Your old password changed. <br/> Sign in using new password.', SnackBarType.Success, 6000)
                        this.router.navigate([ClientPath.sign_in]).finally()
                    })
                )
        )
    }

}
