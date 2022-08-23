import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, Optional, SkipSelf } from '@angular/core'
import { UserProfileShortModel } from '@dto'
import { environment } from '@env'
import { ApiPath, Params } from '@shared-lib/constants'
import { Storage } from '@shared/storage'
import { map, Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class StatesService {

    userProfileShort?: UserProfileShortModel
    private auth: Subject<boolean> = new Subject()

    constructor(
        private http: HttpClient,
        @Optional() @SkipSelf() states: StatesService
    ) {
        if (states) {
            throw new Error('StatesService is already created. Provide it in the CoreModule only')
        }
    }

    get profileMenuIcon(): string {
        return this.userProfileShort?.nickname?.substr(0, 1).toUpperCase() || ''
    }

    isAuth(): Subject<boolean> {
        return this.auth
    }

    getUserProfileShort(): Observable<void> {
        const options = {params: new HttpParams().set(Params.user_id, Storage.user_id)}
        return this.http.get<UserProfileShortModel>(environment.apiEndPoint + ApiPath.user_get_profile_short, options)
            .pipe(
                map((data) => {
                        this.userProfileShort = data
                        Storage.username = data.nickname
                        this.isAuth().next(true)
                    }
                )
            )
    }

}
