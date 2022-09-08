import { Component, OnInit } from '@angular/core'
import { ProcessForm } from '@shared/form'
import { AppService } from './app.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends ProcessForm implements OnInit {

    constructor(
        private app: AppService
    ) {
        super()
    }

    ngOnInit() {
        this.execute(this.app.isAuth())
    }

}
