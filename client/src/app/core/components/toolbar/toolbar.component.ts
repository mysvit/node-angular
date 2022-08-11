import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { StatesService } from '@core/services/states.service'
import { ClientPath } from '@shared-lib/constants'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    isAuth: boolean = false

    constructor(
        private router: Router,
        private states: StatesService
    ) {
        this.states.isAuth().subscribe(data => {
            console.debug(data)
            this.isAuth = data
        })
    }

    gotoLoginClick() {
        this.router.navigate([ClientPath.login]).finally()
    }
}
