import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserProfileShort } from '@dto'
import { environment } from '@env'
import { ApiPath, Params } from '@shared-lib/constants'
import { Storage } from '@static/storage'
import { map, Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class StatesService {

    userProfileShort?: UserProfileShort
    private auth: Subject<boolean> = new Subject()

    constructor(private http: HttpClient) {
    }

    get profileMenuIcon() {
        return this.userProfileShort?.username?.substr(0, 1).toUpperCase() || ''
    }

    isAuth() {
        return this.auth
    }

    getUserProfileShort(): Observable<void> {
        const options = {params: new HttpParams().set(Params.user_id, Storage.user_id)}
        return this.http.get<UserProfileShort>(environment.apiEndPoint + ApiPath.user_get_profile_short, options)
            .pipe(
                map((data) => {
                        this.userProfileShort = data
                        Storage.username = data.username
                        this.isAuth().next(true)
                    }
                )
            )
    }

}
