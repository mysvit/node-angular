import { Component, Injector, OnDestroy, OnInit } from '@angular/core'
import { ProcessForm } from '@shared/form'
import { FieldValidators } from '@shared/validators'
import { UserProfileService } from '../user-profile.service'
import { UserEmailsFormModel } from './user-emails-form-model'

@Component({
    selector: 'app-user-emails',
    templateUrl: './user-emails.component.html',
    styleUrls: ['./user-emails.component.scss']
})
export class UserEmailsComponent extends ProcessForm implements OnInit, OnDestroy {

    FieldValidators = FieldValidators
    public formModel: UserEmailsFormModel = new UserEmailsFormModel()

    constructor(
        injector: Injector,
        private userProfile: UserProfileService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.userProfile.userProfileModel.subscribe((data) => this.formModel.formGroup.patchValue(data))
    }

    ngOnDestroy(): void {
        this.userProfile.userProfileModel.complete()
    }

    updateEmailClick() {

    }

}
