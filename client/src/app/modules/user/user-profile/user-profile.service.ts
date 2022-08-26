import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    constructor() {
    }


    // getUserProfile(): Observable<void> {
    //     return this.http
    //         .get<UserProfileModel>(environment.apiEndPoint + ApiPath.user_get_profile.replace(ApiParams._user_id, Storage.user_id))
    //         .pipe(
    //             map((data) => {
    //                     this.userProfileShort = data
    //                     this.isAuth().next(true)
    //                 }
    //             )
    //         )
    // }

}
