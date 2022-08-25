import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthModel, LoginModel, VerifyModel } from '@dto'
import { environment } from '@env'
import { ApiPath } from '@shared-lib/constants'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    constructor(
        private http: HttpClient
    ) {
    }

    login(model: LoginModel): Observable<AuthModel> {
        return this.http.post<AuthModel>(environment.apiEndPoint + ApiPath.user_login, model)
    }

    confirm(user_id: string, verification_code: string): Observable<AuthModel> {
        return this.http.put<AuthModel>(environment.apiEndPoint + ApiPath.user_verify.replace(':user_id', user_id),
            <VerifyModel>{verification_code: verification_code})
    }

}
