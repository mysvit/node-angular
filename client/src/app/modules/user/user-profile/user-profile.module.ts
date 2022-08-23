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
import { UserEmailsComponent } from './user-emails/user-emails.component'
import { UserPasswordComponent } from './user-password/user-password.component'
import { UserProfileRoutingModule } from './user-profile-routing.module'
import { UserProfileComponent } from './user-profile.component'
import { UserPublicProfileComponent } from './user-public-profile/user-public-profile.component'


@NgModule({
    declarations: [
        UserProfileComponent,
        UserPasswordComponent,
        UserEmailsComponent,
        UserPublicProfileComponent
    ],
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatExpansionModule,
        MatIconModule,
        MatMenuModule
    ]
})
export class UserProfileModule {
}