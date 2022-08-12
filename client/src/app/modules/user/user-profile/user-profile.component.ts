import { Component, OnInit } from '@angular/core'
import { ProcessForm } from '@static/form'
import { FieldValidators } from '@static/validators'
import { UserProfileModel } from './user-profile-model'

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    model = new UserProfileModel()

    constructor() {
        super()
    }

    ngOnInit(): void {
    }

    saveClick() {
    }

}
