import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { UserLoginRoutingModule } from './user-login-routing.module'
import { UserLoginComponent } from './user-login.component'
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component'


@NgModule({
    declarations: [
        UserLoginComponent,
        UserVerificationComponent,
        UserForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        UserLoginRoutingModule,
        FormsModule
    ]
})
export class UserLoginModule {
}
