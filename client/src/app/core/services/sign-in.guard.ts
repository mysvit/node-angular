import { Injectable } from '@angular/core'
import { CanLoad, Route, Router, UrlSegment } from '@angular/router'
import { StatesService } from '@core/services/states.service'
import { ClientPath } from '@shared-lib/constants'
import { map, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class SignInGuard implements CanLoad {

    constructor(private states: StatesService, private router: Router) {
    }

    canLoad(route: Route, segment: UrlSegment[]): Observable<boolean> {
        const url = `/${route.path}`
        return this.checkSignIn(url)
    }

    checkSignIn(url: string): Observable<boolean> {
        return this.states.isAuth()
            .pipe(
                map(auth => {
                    if (auth) {
                        // Store the attempted URL for redirecting
                        this.states.redirectUrl = url
                        // Navigate to the sign_in page
                        this.router.navigate([ClientPath.one_level_back]).finally()
                    }
                    return !auth
                })
            )
    }

}