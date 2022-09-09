import { HttpClient } from '@angular/common/http'
import { Injectable, Optional, SkipSelf } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class StatesService {

    public redirectUrl?: string

    constructor(
        private http: HttpClient,
        @Optional() @SkipSelf() states: StatesService
    ) {
        if (states) {
            throw new Error('StatesService is already created. Provide it in the CoreModule only')
        }
    }

}
