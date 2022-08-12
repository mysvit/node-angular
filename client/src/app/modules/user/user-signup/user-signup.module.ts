import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { UserSignupRoutingModule } from './user-signup-routing.module'
import { UserSignupComponent } from './user-signup.component'


@NgModule({
    declarations: [
        UserSignupComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        UserSignupRoutingModule
    ]
})
export class UserSignupModule {
}
