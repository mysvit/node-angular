import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SignupModel } from '@dto'
import { environment } from '@env'
import { ApiPath } from '@shared-lib/constants'

@Injectable({
    providedIn: 'root'
})
export class UserSignupService {

    constructor(private http: HttpClient) {
    }

    signup(user: SignupModel) {
        return this.http.post(environment.apiEndPoint + ApiPath.user_signup, user)
    }

}
