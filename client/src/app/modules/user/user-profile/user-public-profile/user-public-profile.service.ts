import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PictureModel, UserPublicProfileModel } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserPublicProfileService {

    constructor(
        private http: HttpClient
    ) {
    }

    updUserPublicProfile(userId: string, userPublicProfileModel: UserPublicProfileModel): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.user_upd_public_profile.replace(ApiParams._user_id, userId), userPublicProfileModel)
    }

    updUserProfilePicture(userId: string, pictureModel: PictureModel): Observable<string> {
        return this.http.put<string>(environment.apiEndPoint + ApiPath.user_upd_profile_picture.replace(ApiParams._user_id, userId), pictureModel)
    }

}
