import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { EmailFieldComponent } from './components/fields/email-field/email-field.component'
import { PasswordFieldComponent } from './components/fields/password-field/password-field.component'
import { UsernameFieldComponent } from './components/fields/username-field/username-field.component'

const fields = [
    EmailFieldComponent,
    UsernameFieldComponent,
    PasswordFieldComponent
]

@NgModule({
    declarations: [
        fields
    ],
    exports: [
        fields
    ],
    imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
}
