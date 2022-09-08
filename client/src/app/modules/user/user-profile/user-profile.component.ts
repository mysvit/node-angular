import { Component, OnInit } from '@angular/core'
import { ProcessForm } from '@shared/form'
import { FieldValidators } from '@shared/validators'
import { UserProfileService } from './user-profile.service'
import { UserPublicProfileModel } from './user-public-profile/user-public-profile-model'

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    providers: [UserProfileService]
})
export class UserProfileComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    model = new UserPublicProfileModel()

    constructor() {
        super()
    }

    ngOnInit(): void {
        this.loadData()
    }

    loadData() {
    }

    updateProfileClick() {
    }

}
