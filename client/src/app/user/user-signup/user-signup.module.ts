import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { CoreModule } from '@core/core.module'
import { SharedModule } from '@shared/shared.module'
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
        CoreModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class UserSignupModule {
}
