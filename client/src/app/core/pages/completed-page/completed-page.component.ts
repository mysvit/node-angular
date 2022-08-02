import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-completed-page',
    templateUrl: './completed-page.component.html',
    styleUrls: ['./completed-page.component.scss']
})
export class CompletedPageComponent {

    message?: string

    constructor(private router: Router) {
        this.message = this.router.getCurrentNavigation()?.extras?.state?.['message']
    }

}
