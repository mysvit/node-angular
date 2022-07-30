import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Storage } from '@core/storage'
import { map, of } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    constructor(http: HttpClient) {
    }

    login(user: string, password: string) {
        return of({user: user, password: password})
            .pipe(
                map(data => {
                    Storage.user = data.user
                    Storage.token = data.password
                })
            )
    }

}
