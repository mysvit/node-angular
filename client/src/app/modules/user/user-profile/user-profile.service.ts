import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EmailModel, PictureModel, UserProfileModel, UserPublicProfileModel, VerifyCodeModel } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { SlStorage } from '@shared/storage'
import { BehaviorSubject, map, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    public userProfileModel: BehaviorSubject<UserProfileModel> = new BehaviorSubject<UserProfileModel>(<UserProfileModel>{})

    constructor(
        private http: HttpClient
    ) {
    }

    getUserProfile(): Observable<void> {
        return this.http.get<UserProfileModel>(environment.apiEndPoint + ApiPath.user_get_profile.replace(ApiParams._user_id, SlStorage.user_id))
            .pipe(
                map((data) => this.userProfileModel.next(data))
            )
    }

    updUserPublicProfile(userId: string, userPublicProfileModel: UserPublicProfileModel): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.user_upd_public_profile.replace(ApiParams._user_id, userId), userPublicProfileModel)
    }

    updUserProfilePicture(userId: string, pictureModel: PictureModel): Observable<string> {
        return this.http.put<string>(environment.apiEndPoint + ApiPath.user_upd_picture_profile.replace(ApiParams._user_id, userId), pictureModel)
    }

    modifyEmail(userId: string, emailModel: EmailModel): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.user_modify_email.replace(ApiParams._user_id, userId), emailModel)
    }

    verifyNewEmail(userId: string, verifyCodeModel: VerifyCodeModel): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.user_verify_new_email.replace(ApiParams._user_id, userId), verifyCodeModel)
    }

}
