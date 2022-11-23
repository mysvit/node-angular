import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { DateTimeYyyyMmDdHhMmSsPipe } from '@shared/pipes/date-time-yyyy-mm-dd-hh-mm-ss.pipe'
import { EmailFieldComponent } from './components/fields/email-field/email-field.component'
import { PaginatorComponent } from './components/paginator/paginator.component'
import { PictureUrlPipe } from './pipes/picture.pipe'

const components = [
    EmailFieldComponent,
    PaginatorComponent
]

const pipes = [
    PictureUrlPipe,
    DateTimeYyyyMmDdHhMmSsPipe
]

@NgModule({
    declarations: [
        components,
        pipes
    ],
    exports: [
        components,
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
