import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { SpinnerDirective } from '@shared/directives/spinner.directive'
import { EmailFieldComponent } from './components/fields/email-field/email-field.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { PicturePipe } from './pipes/picture.pipe'

const components = [
    EmailFieldComponent,
    SpinnerComponent
]

const pipes = [
    PicturePipe
]

const directives = [
    SpinnerDirective
]

@NgModule({
    declarations: [
        components,
        directives,
        pipes
    ],
    exports: [
        components,
        directives,
        pipes
    ],
    imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ]
})
export class SharedModule {
}
