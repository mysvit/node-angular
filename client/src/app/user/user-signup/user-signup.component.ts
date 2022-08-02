import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProcessForm } from '@core/components/form/process-form'
import { ProcessStates } from '@core/enum/process-states'
import { IUser } from '@dto'
import { FieldValidators } from '@shared/validators'
import { UserSignupModel } from './user-signup.model'
import { UserSignupService } from './user-signup.service'

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent extends ProcessForm {

    FieldValidators = FieldValidators
    model = new UserSignupModel()

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userSignup: UserSignupService
    ) {
        super()
    }

    registerClick() {
        this.processState = ProcessStates.EXECUTING
        // this.model.formGroup.markAllAsTouched()
        // if (this.model.formGroup.touched && this.model.formGroup.valid) {
        //     this.execute(
        //         this.userSignup.signup(
        //             <IUser>{
        //                 user_email: this.model.user_email.value,
        //                 user_name: this.model.user_name.value,
        //                 user_pass: this.model.user_pass.value
        //             })
        //     )
        // }
    }

    override processCompleted() {
        super.processCompleted()
        this.router.navigate(['completed'], {relativeTo: this.route, state: {message: 'Check your email to confirm your account.'}}).finally()
    }

}
