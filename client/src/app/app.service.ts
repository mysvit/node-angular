import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { StatesService } from '@core/services/states.service'
import { environment } from '@env'
import { ApiPath } from '@shared-lib/constants'
import { catchError, map, of } from 'rxjs'

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
                map(() => this.states.isAuth().next(true)),
                // catch error interceptor
                catchError(() => of(true))
            )
    }

}
