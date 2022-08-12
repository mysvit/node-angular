import { Injectable } from '@angular/core'
import { UserProfileShort } from '@dto'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class StatesService {

    userProfileShort?: UserProfileShort
    private auth: Subject<boolean> = new Subject()

    constructor() {
    }

    isAuth() {
        return this.auth
    }

    profileMenuIcon() {
        return this.userProfileShort?.username?.substr(0, 1).toUpperCase() || ''
    }

}
