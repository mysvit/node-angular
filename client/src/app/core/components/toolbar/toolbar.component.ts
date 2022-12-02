import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ApiParams, ClientPath } from '@shared-lib/constants'
import { PictureHelper } from '@shared/helper'
import { SlStorage } from '@shared/storage'
import { MenuItemType, MenuModel } from '@standalone/menu/menu.model'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    get isAuth(): boolean {
        return SlStorage.isAuth
    }

    get avatarUrl(): string {
        return PictureHelper.getPictureUrl(SlStorage.avatar_id)
    }

    get nickname(): string {
        return SlStorage.nickname
    }

    items = [
        <MenuModel>{
            id: 0,
            type: MenuItemType.Title,
            text: this.getTitle.bind(this)
        },
        <MenuModel>{
            id: 1,
            type: MenuItemType.ThematicBreak
        },
        <MenuModel>{
            id: 2,
            type: MenuItemType.Button,
            icon: 'account_circle',
            text: 'Your profile',
            click: this.handleProfileClick.bind(this)
        },
        <MenuModel>{
            id: 3,
            type: MenuItemType.ThematicBreak
        },
        <MenuModel>{
            id: 4,
            type: MenuItemType.Button,
            icon: 'logout',
            text: 'Sign Out',
            click: this.handleSignOutClick.bind(this)
        }
    ]

    constructor(
        private router: Router
    ) {
    }

    handleHomeClick() {
        this.router.navigate([ClientPath.home]).finally()
    }

    handleSignInClick() {
        this.router.navigate([ClientPath.sign_in]).finally()
    }

    handleProfileClick() {
        this.router.navigate([ClientPath.user_profile]).finally()
    }

    handleSignOutClick() {
        SlStorage.remove(ApiParams.token)
        SlStorage.isAuth = false
        this.router.navigateByUrl(ClientPath.home, {skipLocationChange: true}).then(() => {
            window.location.reload()
        })
    }

    private getTitle(): string {
        return `Signed in as <b>${this.nickname}</b>`
    }

}
