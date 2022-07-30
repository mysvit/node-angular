import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IUser } from '@dto'
import { environment } from '@env'

@Injectable({
    providedIn: 'root'
})
export class UserSignupService {

    constructor(private http: HttpClient) {
    }

    signup(user: IUser) {
        return this.http.post(environment.apiEndPoint + '/user/add', user)
    }

}
