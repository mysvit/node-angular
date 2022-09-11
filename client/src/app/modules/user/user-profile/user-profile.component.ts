import { Component, Injector } from '@angular/core'
import { ProcessForm } from '@shared/form'
import { UserProfileService } from './user-profile.service'

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    providers: [UserProfileService]
})
export class UserProfileComponent extends ProcessForm {

    constructor(
        injector: Injector,
        private userProfile: UserProfileService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.execute(
            this.userProfile.getUserProfile()
        )
    }

}
