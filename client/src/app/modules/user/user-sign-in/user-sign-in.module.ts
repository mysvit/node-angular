import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { SharedModule } from '@shared/shared.module'
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component'
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component'
import { UserSignInRoutingModule } from './user-sign-in-routing.module'
import { UserSignInComponent } from './user-sign-in.component'
import { UserVerificationComponent } from './user-verification/user-verification.component'


@NgModule({
    declarations: [
        UserSignInComponent,
        UserVerificationComponent,
        UserForgotPasswordComponent,
        UserResetPasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        UserSignInRoutingModule,
        SharedModule
    ]
})
export class UserSignInModule {
}
