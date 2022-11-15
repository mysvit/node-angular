import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { SpinnerDirective } from '@shared/directives/spinner.directive'
import { DateTimeYyyyMmDdHhMmSsPipe } from '@shared/pipes/date-time-yyyy-mm-dd-hh-mm-ss.pipe'
import { EmailFieldComponent } from './components/fields/email-field/email-field.component'
import { PaginatorComponent } from './components/paginator/paginator.component'
import { SnackBarComponent } from './components/snack-bar/snack-bar.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { PictureUrlPipe } from './pipes/picture.pipe'

const components = [
    EmailFieldComponent,
    SpinnerComponent,
    SnackBarComponent,
    PaginatorComponent
]

const pipes = [
    PictureUrlPipe,
    DateTimeYyyyMmDdHhMmSsPipe
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
