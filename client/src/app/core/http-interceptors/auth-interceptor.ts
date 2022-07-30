import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Storage } from '@core/storage'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        /*
        * The verbose way:
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', authToken)
        });
        */
        // Clone the request and set the new header in one step.
        const authReq = req.clone({setHeaders: {Authorization: `bear ${Storage.token}`}})

        // send cloned request with header to the next handler.
        return next.handle(authReq)
    }

}
