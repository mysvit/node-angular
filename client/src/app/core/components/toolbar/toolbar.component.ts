import { Component } from '@angular/core'
import { StatesService } from '@core/services/states.service'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    isAuth: boolean = false

    constructor(private states: StatesService) {
        this.states.isAuth().subscribe(data => {
            console.debug(data)
            this.isAuth = data
        })
    }

}
