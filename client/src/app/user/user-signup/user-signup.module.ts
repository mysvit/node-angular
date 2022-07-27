import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'
import { UserSignupRoutingModule } from './user-signup-routing.module'
import { UserSignupComponent } from './user-signup.component'


@NgModule({
    declarations: [
        UserSignupComponent
    ],
    imports: [
        CommonModule,
        UserSignupRoutingModule,
        SharedModule
    ]
})
export class UserSignupModule {
}
