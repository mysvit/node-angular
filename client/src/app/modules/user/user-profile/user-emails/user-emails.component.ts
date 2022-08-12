import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-user-emails',
    templateUrl: './user-emails.component.html',
    styleUrls: ['./user-emails.component.scss']
})
export class UserEmailsComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        console.debug('UserEmailsComponent')
    }

}
