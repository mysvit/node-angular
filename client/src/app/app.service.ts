import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env'
import { ApiPath } from '@shared-lib/constants'
import { SlStorage } from '@shared/storage'
import { catchError, map, of } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private http: HttpClient
    ) {
    }

    isAuth() {
        return this.http.get(environment.apiEndPoint + ApiPath.user_auth)
            .pipe(
                map(() => SlStorage.isAuth = true),
                // catch error interceptor
                catchError(() => of(true))
            )
    }

}
