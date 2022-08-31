import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, Optional, SkipSelf } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { MessageType } from '@shared/enum'
import { SlStorage } from '@shared/storage'
import { StatusCodes } from 'http-status-codes'
import { catchError, throwError } from 'rxjs'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private states: StatesService,
        private snackBar: SnackBarService,
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
                                this.states.isAuth().next(false)
                                SlStorage.remove(ApiParams.token)
                                break
                        }
                        // for check authentication doesn't show snackBar
                        if (error?.url?.indexOf(ApiPath.user_auth) >= 0) {
                            return throwError(() => new Error('User is not authenticated.'))
                        }

                        // show snack bar for all backend error
                        this.snackBar.show(message, MessageType.Error)
                        // Return an observable with a user-facing error message.
                        return throwError(() => new Error(message))
                    }
                )
            )
    }

}
