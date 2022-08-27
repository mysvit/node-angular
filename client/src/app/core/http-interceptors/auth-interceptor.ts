import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, Optional, SkipSelf } from '@angular/core'
import { ApiParams } from '@shared-lib/constants'
import { SlStorage } from '@shared/storage'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        @Optional() @SkipSelf() auth: AuthInterceptor
    ) {
        if (auth) {
            throw new Error('AuthInterceptor is already created. Provide it in the CoreModule only')
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Clone the request and set the new header in one step.
        const authReq = req
            .clone({
                setHeaders: {
                    [ApiParams.authorization]: SlStorage.token,
                    [ApiParams.user_id]: SlStorage.user_id
                }
            })

        // send cloned request with header to the next handler.
        return next.handle(authReq)
    }

}
