import { Component, Injector, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { EmailModel, VerifyCodeModel } from '@dto'
import { ApiParams, ClientPath } from '@shared-lib/constants'
import { MessageType } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { UserProfileService } from '../user-profile.service'
import { NewEmailFormModel, UserEmailFormModel, VerifyFormModel } from './user-email-form-model'

@Component({
    selector: 'app-user-email',
    templateUrl: './user-email.component.html',
    styleUrls: ['./user-email.component.scss']
})
export class UserEmailComponent extends ProcessForm implements OnInit, OnDestroy {

    EmailState = EmailState
    FieldValidators = FieldValidators
    emailState: EmailState = EmailState.CurrentEmail
    currentEmailFormModel: UserEmailFormModel = new UserEmailFormModel()
    newEmailFormModel: NewEmailFormModel = new NewEmailFormModel()
    verifyFormModel: VerifyFormModel = new VerifyFormModel()

    constructor(
        injector: Injector,
        private router: Router,
        private userProfile: UserProfileService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.userProfile.userProfileModel.subscribe((data) => this.currentEmailFormModel.formGroup.patchValue(data))
    }

    ngOnDestroy(): void {
        this.userProfile.userProfileModel.complete()
    }

    newEmailClick() {
        this.emailState = EmailState.NewEmail
    }

    modifyEmailClick() {
        if (!this.newEmailFormModel.isFieldValid()) return
        this.execute(
            this.userProfile.modifyEmail(<EmailModel>{email: this.newEmailFormModel.newEmail.value})
                .pipe(
                    map(() => {
                        this.snackBar?.show('Check your new email to get verification code.', MessageType.Success, 6000)
                        this.emailState = EmailState.VerifyCode
                    })
                )
        )
    }

    verifyEmailClick() {
        if (!this.verifyFormModel.isFieldValid()) return
        this.execute(
            this.userProfile.verifyNewEmail(<VerifyCodeModel>{verificationCode: this.verifyFormModel.verificationCode.value})
                .pipe(
                    map(() => {
                        SlStorage.isAuth = false
                        SlStorage.remove(ApiParams.token)
                        SlStorage.email = this.newEmailFormModel.newEmail.value
                        this.snackBar?.show('Your new email changed and verified. <br/> Sign in using new email.', MessageType.Success, 6000)
                        this.router.navigate([ClientPath.sign_in]).finally()
                    })
                )
        )
    }

    homeClick() {
        this.emailState = EmailState.CurrentEmail
    }
}

enum EmailState {
    CurrentEmail,
    NewEmail,
    VerifyCode
}
