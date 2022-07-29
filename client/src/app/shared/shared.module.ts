import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { EmailFieldComponent } from './components/fields/email-field/email-field.component'

const fields = [
    EmailFieldComponent
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
