import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ChangePassModel, EmailModel, PictureModel, UserProfileModel, UserPublicProfileModel, VerifyCodeModel } from '@dto'
import { environment } from '@env'
import { ApiPath } from '@shared-lib/constants'
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
        return this.http.get<UserProfileModel>(environment.apiEndPoint + ApiPath.users_get_profile)
            .pipe(
                map((data) => this.userProfileModel.next(data))
            )
    }

    updUserPublicProfile(userPublicProfileModel: UserPublicProfileModel): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.users_upd_public_profile, userPublicProfileModel)
    }

    updUserProfilePicture(pictureModel: PictureModel): Observable<string> {
        return this.http.put<string>(environment.apiEndPoint + ApiPath.users_upd_picture_profile, pictureModel)
    }

    modifyEmail(emailModel: EmailModel): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.users_modify_email, emailModel)
    }

    verifyNewEmail(verifyCodeModel: VerifyCodeModel): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.users_verify_new_email, verifyCodeModel)
    }

    changePassword(changePassModel: ChangePassModel): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.users_change_password, changePassModel)
    }

}
