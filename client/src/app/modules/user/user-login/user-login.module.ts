import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { UserLoginRoutingModule } from './user-login-routing.module'
import { UserLoginComponent } from './user-login.component'


@NgModule({
    declarations: [
        UserLoginComponent
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
