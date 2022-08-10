import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class StatesService {

    private auth: Subject<boolean> = new Subject()

    constructor() {
    }

    isAuth() {
        return this.auth
    }

}
