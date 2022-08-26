import { Component, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { ClientPath } from '@shared-lib/constants'
import { Storage } from '@shared/storage'
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
                this.avatar = Storage.avatar_id
                this.gravatar = Storage.nickname.substring(0, 1).toUpperCase()
                this.nickname = Storage.nickname
            }
        })
    }

    ngOnDestroy() {
        this.states.isAuth().unsubscribe()
    }

    loginClick() {
        this.router.navigate([ClientPath.login]).finally()
    }

    profileClick() {
        this.router.navigate([ClientPath.user_profile]).finally()
    }

    signOutClick() {
        Storage.clear()
        this.states.isAuth().next(false)
        this.router.navigate([ClientPath.root]).finally()
    }

}
