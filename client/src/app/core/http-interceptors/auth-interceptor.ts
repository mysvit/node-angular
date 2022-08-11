import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Params } from '@shared-lib/constants'
import { Storage } from '@static/storage'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Clone the request and set the new header in one step.
        const authReq = req.clone({
            setHeaders: {
                [Params.authorization]: Storage.token,
                [Params.user_id]: Storage.user_id
            }
        })

        // send cloned request with header to the next handler.
        return next.handle(authReq)
    }

}
