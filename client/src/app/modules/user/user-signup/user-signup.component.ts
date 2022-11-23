import { Component, Injector } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PictureModel, UserSignupModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { UserSignupFormModel } from './user-signup.form-model'
import { UserSignupService } from './user-signup.service'

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent extends ProcessForm {

    FieldValidators = FieldValidators
    formModel = new UserSignupFormModel()

    constructor(
        injector: Injector,
        private activatedRoute: ActivatedRoute,
        private userSignup: UserSignupService
    ) {
        super(injector)
        this.snackBar?.close()
    }

    registerClick() {
        if (!this.formModel.isFieldValid()) return

        const avatarChar = this.formModel.nickname.value.trim().substring(0, 1).toUpperCase()
        this.execute(
            this.userSignup.signup(
                <UserSignupModel>{
                    email: this.formModel.email.value,
                    nickname: this.formModel.nickname.value,
                    password: this.formModel.password.value,
                    avatar: <PictureModel>{
                        name: avatarChar,
                        ext: 'png',
                        height: 56,
                        width: 56,
                        contentBase64: PictureHelper.createImageFromLetter(avatarChar, 56, 56)
                    }
                }),
            {completedMessage: 'You have successful signup.<br/>Now you can sign in to your account.<br/>Check your email to get verification code.'}
        )
    }

    override processCompleted(message?: any) {
        super.processCompleted(message)
        SlStorage.email = this.formModel.email.value
        this.router.navigate([ClientPath.slash + ClientPath.sign_in]).finally()
    }

}
