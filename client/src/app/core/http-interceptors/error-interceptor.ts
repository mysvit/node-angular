import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, throwError } from 'rxjs'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error) => {
                    if (error.status === 0) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.error('An error occurred:', error.error)
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong.
                        console.error(
                            `Backend returned code ${error.status}, body was: `, error.error)
                    }
                    // Return an observable with a user-facing error message.
                    return throwError(() => new Error('Something bad happened; please try again later.'))
                }
            )
        )
        //     tap({
        //         // Succeeds when there is a response; ignore other events
        //         next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        //         // Operation failed; error is an HttpErrorResponse
        //         error: (error) => (ok = 'failed')
        //     }),
        //     // Log when response observable either completes or errors
        //     finalize(() => {
        //         const elapsed = Date.now() - started;
        //         const msg = `${req.method} "${req.urlWithParams}"
        //      ${ok} in ${elapsed} ms.`;
        //         this.messenger.add(msg);
        //     })
        // );
    }

}
