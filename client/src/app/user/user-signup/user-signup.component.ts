import { Component, OnInit } from '@angular/core'
import { RegisterModel } from '@dto'

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

    registerModel: RegisterModel = new RegisterModel()

    constructor() {
        this.registerModel.email = 'test@email.com'
    }

    ngOnInit(): void {
    }

    registerClick() {

    }

}
