/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ErrorInterceptor } from '@core/http-interceptors/error-interceptor'
import { AuthInterceptor } from './auth-interceptor'

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
]
