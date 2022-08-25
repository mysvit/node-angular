import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { UserSignupModel } from '@dto'
import { ClientPath } from '@shared-lib/constants'
import { ProcessForm } from '@shared/form'
import { FieldValidators } from '@shared/validators'
import { UserSignupFormModel } from './user-signup.model'
import { UserSignupService } from './user-signup.service'

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent extends ProcessForm {

    FieldValidators = FieldValidators
    model = new UserSignupFormModel()

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userSignup: UserSignupService,
        private snackBar: SnackBarService
    ) {
        super()
    }

    registerClick() {
        this.model.formGroup.markAllAsTouched()
        if (this.model.formGroup.touched && this.model.formGroup.valid) {
            this.execute(
                this.userSignup.signup(
                    <UserSignupModel>{
                        email: this.model.email.value,
                        nickname: this.model.nickname.value,
                        password: this.model.password.value
                    })
            )
        }
    }

    override processCompleted() {
        super.processCompleted()
        this.snackBar.dismiss()
        this.router
            .navigate([ClientPath.completed],
                {
                    relativeTo: this.route,
                    state: {message: 'You have successful signup and you can login. <br> Check your email to get confirmation code.'}
                }
            )
            .finally()
    }

}
