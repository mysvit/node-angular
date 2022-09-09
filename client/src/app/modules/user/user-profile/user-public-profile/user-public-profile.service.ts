import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PictureModel } from '@dto'
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

    updUserProfilePicture(userId: string, pictureModel: PictureModel): Observable<string> {
        return this.http.put<string>(environment.apiEndPoint + ApiPath.user_upd_profile_picture.replace(ApiParams._user_id, userId), pictureModel)
    }

}
