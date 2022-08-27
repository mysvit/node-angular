import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PictureModel, UserProfileModel } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { SlStorage } from '@shared/storage'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserPublicProfileService {


    constructor(
        private http: HttpClient
    ) {
    }

    pictureAdd(pictureModel: PictureModel): Observable<boolean> {
        return this.http.post<boolean>(environment.apiEndPoint + ApiPath.picture_add, pictureModel)
    }


    getUserProfile(): Observable<UserProfileModel> {
        return this.http.get<UserProfileModel>(environment.apiEndPoint + ApiPath.user_get_profile.replace(ApiParams._user_id, SlStorage.user_id))
    }

}
