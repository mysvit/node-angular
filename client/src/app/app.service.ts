import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { StatesService } from '@core/services/states.service'
import { environment } from '@env'
import { ApiPath, Props } from '@shared-lib/constants'
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
        const options = {params: new HttpParams().set(Props.user_id, Storage.user_id)}
        this.http.get(environment.apiEndPoint + ApiPath.user_get_profile_short, options)
            .subscribe({
                complete: () => {
                    this.states.isAuth().next(true)
                    console.info('Auth=>true')
                },
                error: () => {
                    this.states.isAuth().next(false)
                    Storage.clear()
                }
            })
    }

}
