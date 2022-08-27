import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router'
import { StatesService } from '@core/services/states.service'
import { ClientPath } from '@shared-lib/constants'
import { StringHelper } from '@shared-lib/helpers'
import { map, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private states: StatesService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url
        return this.checkLogin(url)
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state)
    }

    canLoad(route: Route): Observable<boolean> {
        const url = `/${route.path}`
        return this.checkLogin(url)
    }

    checkLogin(url: string): Observable<boolean> {
        return this.states.isAuth()
            .pipe(
                map(auth => {
                    if (!auth) {
                        // Store the attempted URL for redirecting
                        this.states.postAuthRedirectUrl = url
                        // Navigate to the login page
                        this.router.navigate([StringHelper.removeSlash(ClientPath.login)]).finally()
                    }
                    return auth
                })
            )
    }

}
