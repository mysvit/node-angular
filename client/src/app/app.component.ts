import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { ProcessForm } from '@shared/form'
import { AppService } from './app.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends ProcessForm implements OnInit {

    @ViewChild('spinner', {read: ViewContainerRef, static: true}) override spinnerRef?: ViewContainerRef

    constructor(
        injector: Injector,
        private app: AppService
    ) {
        super(injector)
    }

    ngOnInit() {
        this.execute(this.app.isAuth())
    }

}
