import { Component, OnInit } from '@angular/core'
import { Storage } from '@static/storage'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        console.debug('token', Storage.token)
    }

}
