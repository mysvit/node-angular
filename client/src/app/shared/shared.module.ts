import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { SpinnerDirective } from '@shared/directives/spinner.directive'
import { EmailFieldComponent } from './components/fields/email-field/email-field.component'
import { SnackBarComponent } from './components/snack-bar/snack-bar.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { PicturePipe } from './pipes/picture.pipe'

const components = [
    EmailFieldComponent,
    SpinnerComponent,
    SnackBarComponent
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
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class SharedModule {
}
