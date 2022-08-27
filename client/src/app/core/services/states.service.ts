import { HttpClient } from '@angular/common/http'
import { Injectable, Optional, SkipSelf } from '@angular/core'
import { UserProfileModel } from '@dto'
import { SlStorage } from '@shared/storage'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class StatesService {

    userProfileShort?: UserProfileModel
    private auth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(Number.parseInt(SlStorage.is_auth) === 1)
    public postAuthRedirectUrl?: string

    constructor(
        private http: HttpClient,
        @Optional() @SkipSelf() states: StatesService
    ) {
        if (states) {
            throw new Error('StatesService is already created. Provide it in the CoreModule only')
        }
    }

    isAuth(): Subject<boolean> {
        return this.auth
    }


}
