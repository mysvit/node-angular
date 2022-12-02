import { CommonModule } from '@angular/common'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatToolbarModule } from '@angular/material/toolbar'
import { httpInterceptorProviders } from '@core/http-interceptors'
import { StatesService } from '@core/services/states.service'
import { MenuComponent } from '@standalone/menu/menu.component'
import { MenuDirective } from '@standalone/menu/menu.directive'
import { SnackBarService } from '@standalone/snack-bar/snack-bar.service'
import { DialogComponent } from './components/dialog/dialog.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'

const components = [
    ToolbarComponent
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
    MatDialogModule,
    MatProgressSpinnerModule
]

@NgModule({
    declarations: [
        components,
        pages,
        DialogComponent

    ],
    exports: [
        components,
        pages
    ],
    imports: [
        CommonModule,
        mat,
        MenuComponent,
        MenuDirective
    ],
    providers: [
        SnackBarService,
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
