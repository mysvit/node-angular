import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'
import { UserRegistrationRoutingModule } from './user-registration-routing.module'
import { UserRegistrationComponent } from './user-registration.component'


@NgModule({
    declarations: [
        UserRegistrationComponent
    ],
    imports: [
        CommonModule,
        UserRegistrationRoutingModule,
        SharedModule
    ]
})
export class UserRegistrationModule {
}
