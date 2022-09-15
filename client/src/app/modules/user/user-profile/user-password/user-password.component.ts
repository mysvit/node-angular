import { Component, Injector } from '@angular/core'
import { Router } from '@angular/router'
import { ChangePassModel } from '@dto'
import { ApiParams, ClientPath } from '@shared-lib/constants'
import { MessageType } from '@shared/enum'
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
        private router: Router,
        private userProfile: UserProfileService
    ) {
        super(injector)
    }

    changePasswordClick() {
        this.execute(
            this.userProfile
                .changePassword(SlStorage.user_id,
                    <ChangePassModel>{
                        currentPass: this.userPasswordFormModel.currentPassword.value,
                        newPass: this.userPasswordFormModel.newPassword.value
                    }
                )
                .pipe(
                    map(() => {
                        SlStorage.isAuth = false
                        SlStorage.remove(ApiParams.token)
                        this.snackBar?.show('Your old password changed. <br/> Sign in using new password.', MessageType.Success, 6000)
                        this.router.navigate([ClientPath.sign_in]).finally()
                    })
                )
        )
    }

}
