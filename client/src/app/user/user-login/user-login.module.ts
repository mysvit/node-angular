import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { UserLoginRoutingModule } from './user-login-routing.module'
import { UserLoginComponent } from './user-login.component'
import { UserLoginService } from './user-login.service'


@NgModule({
    declarations: [
        UserLoginComponent
    ],
    imports: [
        CommonModule,
        UserLoginRoutingModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [
        UserLoginService
    ]
})
export class UserLoginModule {
}
