import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env'

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) {
    }

    getUserById(user_id: string) {
        const options = {params: new HttpParams().set('user_id', user_id)}
        return this.http.get(environment.apiEndPoint + '/user/getProfile', options)
    }

}
