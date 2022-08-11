import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { StatesService } from '@core/services/states.service'
import { UserProfileShort } from '@dto'
import { environment } from '@env'
import { ApiPath, Params } from '@shared-lib/constants'
import { Storage } from '@static/storage'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private http: HttpClient,
        private states: StatesService
    ) {
    }

    getUserProfileShort() {
        const options = {params: new HttpParams().set(Params.user_id, Storage.userId)}
        this.http.get<UserProfileShort>(environment.apiEndPoint + ApiPath.user_get_profile_short, options)
            .subscribe({
                next: (data) => {
                    Storage.username = data.username
                },
                complete: () => {
                    this.states.isAuth().next(true)
                },
                error: () => {
                    this.states.isAuth().next(false)
                    Storage.clear()
                }
            })
    }

}
