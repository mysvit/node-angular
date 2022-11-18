import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, Optional, SkipSelf } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { ApiParams, ApiPath, ClientPath } from '@shared-lib/constants'
import { ErrorTypes, MessageType } from '@shared/enum'
import { ErrorClient } from '@shared/models/error-client'
import { SlStorage } from '@shared/storage'
import { StatusCodes } from 'http-status-codes'
import { catchError, throwError } from 'rxjs'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private snackBar: SnackBarService,
        private router: Router,
        @Optional() @SkipSelf() error: ErrorInterceptor
    ) {
        if (error) {
            throw new Error('ErrorInterceptor is already created. Provide it in the CoreModule only')
        }
    }

    // catch error for request and response and generate simplified error message for client
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next
            .handle(req)
            .pipe(
                catchError(
                    (error) => {
                        // for api what check auth does not show snackBar
                        if (error?.url?.indexOf(ApiPath.users_auth) >= 0) {
                            return throwError(() => new ErrorClient('User is not authenticated.', ErrorTypes.Interceptor))
                        }

                        // The backend returned an unsuccessful response code.
                        let message = error.error?.message || error.message
                        switch (error.status) {
                            // A client-side or network error occurred. Handle it accordingly.
                            case 0:
                                message = 'No Internet Connection.'
                                break
                            // for unauthenticated call show message
                            case StatusCodes.UNAUTHORIZED:
                            case StatusCodes.FORBIDDEN:
                                message = 'User is not authenticated.'
                                SlStorage.isAuth = false
                                SlStorage.remove(ApiParams.token)
                                // Navigate to the sign-in page
                                this.router.navigate([ClientPath.sign_in]).finally()
                                break
                        }

                        // show snack bar for all backend error
                        this.snackBar.show(message, MessageType.Error)
                        // Return an observable with a user-facing error message.
                        return throwError(() => new ErrorClient(message, ErrorTypes.Interceptor))
                    }
                )
            )
    }

}
