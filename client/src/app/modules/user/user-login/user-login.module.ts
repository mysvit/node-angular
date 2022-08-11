import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { CoreModule } from '@core/core.module'
import { UserLoginRoutingModule } from './user-login-routing.module'
import { UserLoginComponent } from './user-login.component'
import { UserLoginService } from './user-login.service'


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
        CoreModule,
        FormsModule
    ],
    providers: [
        UserLoginService
    ]
})
export class UserLoginModule {
}