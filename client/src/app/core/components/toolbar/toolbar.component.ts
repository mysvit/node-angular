import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { StatesService } from '@core/services/states.service'
import { ClientPath } from '@shared-lib/constants'
import { Storage } from '@static/storage'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    isAuth: boolean = false
    profileMenuIcon: string = ''

    constructor(
        private router: Router,
        public states: StatesService
    ) {
        this.states.isAuth().subscribe(data => {
            this.isAuth = data
            this.profileMenuIcon = this.states.profileMenuIcon()
        })
    }

    loginClick() {
        this.router.navigate([ClientPath.login]).finally()
    }

    profileClick() {

    }

    signOutClick() {
        Storage.clear()
        this.states.isAuth().next(false)
    }

}
