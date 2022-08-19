import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { StatesService } from '@core/services/states.service'
import { environment } from '@env'
import { ApiPath } from '@shared-lib/constants'
import { Storage } from '@shared/storage'
import { catchError, switchMap, throwError } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private http: HttpClient,
        private states: StatesService
    ) {
    }

    isAuth() {
        return this.http.get(environment.apiEndPoint + ApiPath.user_auth)
            .pipe(
                switchMap(() => this.states.getUserProfileShort()),
                catchError((error) => {
                    this.states.isAuth().next(false)
                    Storage.clear()
                    return throwError(() => new Error(error))
                })
            )
    }

}
