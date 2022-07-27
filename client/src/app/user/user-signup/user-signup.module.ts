import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
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
        SharedModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class UserSignupModule {
}
