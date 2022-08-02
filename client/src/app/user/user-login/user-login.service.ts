import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env'

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    constructor(private http: HttpClient) {
    }

    login(user: any) {
        return this.http.post(environment.apiEndPoint + '/user/login', user)
        // .pipe(
        //     map(data => {
        //         Storage.user = data.user
        //         Storage.token = data.password
        //     })
        // )
    }

}
