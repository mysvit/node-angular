import { Component, OnInit } from '@angular/core'
import { Storage } from '@static/storage'
import { HomeService } from './home.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private home: HomeService
    ) {
    }

    ngOnInit(): void {
        console.debug('token', Storage.token)
    }

    userClick() {
        this.home.getUserById(Storage.user_id).subscribe(data => console.debug(data))
    }

}
