import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env'
import { ApiPath, Props } from '@shared-lib/constants'

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) {
    }

    getUserProfileShort(user_id: string) {
        const options = {params: new HttpParams().set(Props.user_id, user_id)}
        return this.http.get(environment.apiEndPoint + ApiPath.user_get_profile_short, options)
    }

}
