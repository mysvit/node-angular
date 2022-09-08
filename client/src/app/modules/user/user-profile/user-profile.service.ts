import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserProfileModel } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { SlStorage } from '@shared/storage'
import { map, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    userProfileModel?: UserProfileModel

    constructor(
        private http: HttpClient
    ) {
    }

    getUserProfile(): Observable<UserProfileModel> {
        return this.http.get<UserProfileModel>(environment.apiEndPoint + ApiPath.user_get_profile.replace(ApiParams._user_id, SlStorage.user_id))
            .pipe(
                map((data) => this.userProfileModel = data)
            )
    }

}
