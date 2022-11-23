import { CommonModule } from '@angular/common'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { SnackBarComponent } from '@core/components/snack-bar/snack-bar.component'
import { SpinnerComponent } from '@core/components/spinner/spinner.component'
import { SnackBarDirective } from '@core/directives/snack-bar.directive'
import { SpinnerDirective } from '@core/directives/spinner.directive'
import { httpInterceptorProviders } from '@core/http-interceptors'
import { StatesService } from '@core/services/states.service'
import { DialogComponent } from './components/dialog/dialog.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'

const components = [
    SnackBarComponent,
    SpinnerComponent,
    ToolbarComponent
]

const directives = [
    SnackBarDirective,
    SpinnerDirective
]

const pages = [
    NotFoundPageComponent
]

const singletonServices = [
    StatesService
]

const mat = [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule
]

@NgModule({
    declarations: [
        components,
        directives,
        pages,
        DialogComponent

    ],
    exports: [
        components,
        directives,
        pages
    ],
    imports: [
        CommonModule,
        mat

    ],
    providers: [
        MatSnackBar,
        httpInterceptorProviders,
        singletonServices
    ]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only')
        }
    }

}
