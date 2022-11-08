import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserSignupModel } from '@dto'
import { environment } from '@env'
import { ApiPath } from '@shared-lib/constants'

@Injectable({
    providedIn: 'root'
})
export class UserSignupService {

    constructor(private http: HttpClient) {
    }

    signup(user: UserSignupModel) {
        return this.http.post(environment.apiEndPoint + ApiPath.users_signup, user)
    }

}
