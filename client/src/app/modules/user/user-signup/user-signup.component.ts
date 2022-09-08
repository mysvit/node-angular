import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { PictureModel, UserSignupModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserSignupFormModel } from './user-signup.model'
import { UserSignupService } from './user-signup.service'

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent extends ProcessForm {

    FieldValidators = FieldValidators
    model = new UserSignupFormModel()

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userSignup: UserSignupService,
        private snackBar: SnackBarService
    ) {
        super()
        this.snackBar.dismiss()
    }

    registerClick() {
        this.model.formGroup.markAllAsTouched()
        if (this.model.formGroup.touched && this.model.formGroup.valid) {
            const avatarChar = this.model.nickname.value.trim().substring(0, 1).toUpperCase()
            this.execute(
                this.userSignup.signup(
                    <UserSignupModel>{
                        email: this.model.email.value,
                        nickname: this.model.nickname.value,
                        password: this.model.password.value,
                        avatar: <PictureModel>{
                            name: avatarChar,
                            ext: 'png',
                            height: 56,
                            width: 56,
                            contentBase64: PictureHelper.createImageFromLetter(avatarChar, 56, 56)
                        }
                    })
            )
        }
    }

    override processCompleted() {
        super.processCompleted()
        this.snackBar.dismiss()
        this.router.navigate([ClientPath.sign_in]).finally(() => {
                this.snackBar.show('You have successful signup.<br/>Now you can sign in to your account.<br/>Check your email to get verification code.',
                    MessageType.Success)
                SlStorage.email = this.model.email.value
            }
        )
    }

}
