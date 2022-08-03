import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginModel, TokenModel } from '@dto'
import { environment } from '@env'
import { Storage } from '@static/storage'
import { map, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    constructor(private http: HttpClient) {
    }

    login(user: LoginModel): Observable<void> {
        return this.http.post<TokenModel>(environment.apiEndPoint + '/user/login', user)
            .pipe(
                map((data: TokenModel) => {
                    Storage.user_id = data.user_id
                    Storage.token = `Bearer ${data.token}`
                })
            )
    }

}
