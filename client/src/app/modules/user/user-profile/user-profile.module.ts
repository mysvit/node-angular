import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { SharedModule } from '@shared/shared.module'
import { SpinnerDirective } from '@standalone/spinner/spinner.directive'
import { UserEmailComponent } from './user-email/user-email.component'
import { UserPasswordComponent } from './user-password/user-password.component'
import { UserProfileRoutingModule } from './user-profile-routing.module'
import { UserProfileComponent } from './user-profile.component'
import { UserProfileService } from './user-profile.service'
import { UserPublicProfileComponent } from './user-public-profile/user-public-profile.component'


@NgModule({
    declarations: [
        UserProfileComponent,
        UserPasswordComponent,
        UserEmailComponent,
        UserPublicProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UserProfileRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatExpansionModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        SpinnerDirective
    ],
    providers: [
        UserProfileService
    ]
})
export class UserProfileModule {
}
