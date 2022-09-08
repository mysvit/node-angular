import { Component, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { ApiParams, ClientPath } from '@shared-lib/constants'
import { PictureHelper } from '@shared/helper/picture-helper'
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
    avatar?: string

    constructor(
        private router: Router,
        private states: StatesService
    ) {
        this.states.isAuth().subscribe(data => {
            this.isAuth = data
            if (this.isAuth) {
                this.avatar = PictureHelper.getPictureUrl(SlStorage.avatar_id)
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

    signInClick() {
        this.router.navigate([ClientPath.sign_in]).finally()
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
