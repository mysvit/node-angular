import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProcessForm } from '@core/components/form/process-form'
import { ProcessStates } from '@core/enum/process-states'
import { FieldValidators } from '@shared/validators'
import { UserLoginModel } from './user-login-model'
import { UserLoginService } from './user-login.service'

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent extends ProcessForm {

    model = new UserLoginModel()
    FieldValidators = FieldValidators

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userLogin: UserLoginService
    ) {
        super()
    }

    loginClick() {
        this.processState = ProcessStates.EXECUTING
        // this.model.formGroup.markAllAsTouched()
        // if (this.model.formGroup.touched && this.model.formGroup.valid) {
        //     this.execute(
        //         this.userLogin.login(
        //             {
        //                 user: this.model.username.value,
        //                 pass: this.model.password.value
        //             })
        //     )
        // }
    }

    override processCompleted() {
        super.processCompleted()
        this.router.navigate(['home'], {relativeTo: this.route, state: {message: 'Check your email to confirm your account.'}}).finally()
    }

}
