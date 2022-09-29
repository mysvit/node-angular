import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router'
import { StatesService } from '@core/services/states.service'
import { ClientPath } from '@shared-lib/constants'
import { ValueHelper } from '@shared-lib/helpers'
import { SlStorage } from '@shared/storage'

@Injectable({
    providedIn: 'root'
})
export class UserIdGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private states: StatesService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkUserId(state.url)
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state)
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`
        return this.checkUserId(url)
    }

    checkUserId(url: string): boolean {
        if (ValueHelper.isEmpty(SlStorage.user_id)) {
            this.states.redirectUrl = url
            this.router.navigate([ClientPath.sign_in]).finally()
            return false
        } else {
            return true
        }
    }

}
