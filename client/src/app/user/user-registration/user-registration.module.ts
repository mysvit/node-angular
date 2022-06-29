import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UserRegistrationRoutingModule } from './user-registration-routing.module'
import { UserRegistrationComponent } from './user-registration.component'


@NgModule({
    declarations: [
        UserRegistrationComponent
    ],
    imports: [
        CommonModule,
        UserRegistrationRoutingModule
    ]
})
export class UserRegistrationModule {
}
