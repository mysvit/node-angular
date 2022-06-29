import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UserAuthenticationRoutingModule } from './user-authentication-routing.module'
import { UserAuthenticationComponent } from './user-authentication.component'


@NgModule({
    declarations: [
        UserAuthenticationComponent
    ],
    imports: [
        CommonModule,
        UserAuthenticationRoutingModule
    ]
})
export class UserAuthenticationModule {
}
