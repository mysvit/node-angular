import { Component, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { ApiParams, ClientPath } from '@shared-lib/constants'
import { SlStorage } from '@shared/storage'
import { StatesService } from '../../services/states.service'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {

    isAuth: boolean = false
    nickname?: string
    gravatar?: string
    avatar?: string

    constructor(
        private router: Router,
        public states: StatesService
    ) {
        this.states.isAuth().subscribe(data => {
            this.isAuth = data
            if (this.isAuth) {
                this.avatar = SlStorage.avatar_id
                this.gravatar = SlStorage.nickname.substring(0, 1).toUpperCase()
                this.nickname = SlStorage.nickname
            }
        })
    }

    ngOnDestroy() {
        this.states.isAuth().complete()
    }

    homeClick() {
        this.router.navigate([ClientPath.home]).finally()
    }

    loginClick() {
        this.router.navigate([ClientPath.login]).finally()
    }

    profileClick() {
        this.router.navigate([ClientPath.user_profile]).finally()
    }

    signOutClick() {
        SlStorage.remove(ApiParams.token)
        this.states.isAuth().next(false)
        this.router.navigate([ClientPath.root]).finally()
    }

}
