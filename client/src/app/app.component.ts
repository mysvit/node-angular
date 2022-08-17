import { Component, OnInit } from '@angular/core'
import { AppService } from './app.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private app: AppService
    ) {
    }

    ngOnInit() {
        this.app.isAuth().subscribe()
    }

}
