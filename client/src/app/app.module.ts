import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from '@core/core.module'
import { SharedModule } from '@shared/shared.module'
import { DialogDirective } from '@standalone/dialog/dialog.directive'
import { SnackBarDirective } from '@standalone/snack-bar/snack-bar.directive'
import { SpinnerDirective } from '@standalone/spinner/spinner.directive'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SpinnerDirective,
        SnackBarDirective,
        DialogDirective
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass('material-symbols-outlined')
    }
}
