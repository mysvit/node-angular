import { CommonModule } from '@angular/common'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { httpInterceptorProviders } from '@core/http-interceptors'
import { StatesService } from '@core/services/states.service'
import { MenuDirective } from '@standalone/menu/menu.directive'
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

@NgModule({
    declarations: [
        components,
        pages
    ],
    exports: [
        components,
        pages
    ],
    imports: [
        CommonModule,
        MenuDirective
    ],
    providers: [
        singletonServices,
        httpInterceptorProviders
    ]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only')
        }
    }

}
