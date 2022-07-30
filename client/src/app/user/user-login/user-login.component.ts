import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FieldValidators } from '@shared/validators'
import { UserLoginModel } from './user-login-model'
import { UserLoginService } from './user-login.service'

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

    model = new UserLoginModel()
    FieldValidators = FieldValidators

    constructor(
        private router: Router,
        private userLogin: UserLoginService
    ) {
    }

    ngOnInit(): void {
    }

    loginClick() {
        this.model.formGroup.markAllAsTouched()
        console.debug(this.model.formGroup.touched, this.model.formGroup.valid)
        this.userLogin.login(this.model.username.value, this.model.password.value)
            .subscribe(() => this.router.navigate(['/']))
    }

}
