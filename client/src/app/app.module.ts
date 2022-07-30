import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from '@core/core.module'
import { httpInterceptorProviders } from '@core/http-interceptors'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        httpInterceptorProviders
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
