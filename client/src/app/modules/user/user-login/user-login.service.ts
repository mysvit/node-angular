import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env'
import { Storage } from '@static/storage'
import { map } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    constructor(private http: HttpClient) {
    }

    login(user: any) {
        return this.http.post(environment.apiEndPoint + '/user/login', user)
            .pipe(
                map((data: any) => {
                    Storage.token = data.password
                })
            )
    }

}
