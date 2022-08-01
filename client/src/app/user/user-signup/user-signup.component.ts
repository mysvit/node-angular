import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ProcessForm } from '@core/components/form/process-form'
import { IUser } from '@dto'
import { FieldValidators } from '@shared/validators'
import { UserSignupModel } from './user-signup.model'
import { UserSignupService } from './user-signup.service'

@Component({
    selector: 'app-user-signup',
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    model = new UserSignupModel()

    constructor(private router: Router,
                private userSignup: UserSignupService) {
        super()
    }

    ngOnInit(): void {
    }

    registerClick() {
        // this.model.formGroup.markAllAsTouched()
        // if (this.model.formGroup.touched && this.model.formGroup.valid) {
        this.execute(
            this.userSignup.signup(
                <IUser>{
                    user_email: this.model.user_email.value,
                    user_name: this.model.user_name.value,
                    user_pass: this.model.user_pass.value
                })
        )
        // }
    }

    override processCompleted() {
        super.processCompleted()
        this.router.navigate(['completed'])
    }

}
