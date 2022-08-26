import { HttpClient } from '@angular/common/http'
import { Injectable, Optional, SkipSelf } from '@angular/core'
import { UserProfileModel } from '@dto'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class StatesService {

    userProfileShort?: UserProfileModel
    private auth: Subject<boolean> = new Subject()

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
