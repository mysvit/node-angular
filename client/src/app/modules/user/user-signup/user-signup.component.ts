import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { PictureModel, UserSignupModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
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
        private route: ActivatedRoute,
        private userSignup: UserSignupService,
        private snackBar: SnackBarService
    ) {
        super()
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
        this.router
            .navigate([ClientPath.completed],
                {
                    relativeTo: this.route,
                    state: {message: 'You have successful signup and you can log in. <br> Check your email to get verification code.'}
                }
            )
            .finally()
    }

}
