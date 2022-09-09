import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ApiParams, ClientPath } from '@shared-lib/constants'
import { PictureHelper } from '@shared/helper'
import { SlStorage } from '@shared/storage'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    get isAuth(): boolean {
        return SlStorage.is_auth === '1'
    }

    get avatarUrl(): string {
        return PictureHelper.getPictureUrl(SlStorage.avatar_id)
    }

    get nickname(): string {
        return SlStorage.nickname
    }

    constructor(
        private router: Router
    ) {
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
        SlStorage.is_auth = '0'
        this.router.navigate([ClientPath.root]).finally()
    }

}
