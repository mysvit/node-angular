import { Component, OnInit } from '@angular/core'
import { AbstractValueAccessor, MakeProvider } from '../abstract-value-accessor'

@Component({
    selector: 'app-email-field',
    templateUrl: './email-field.component.html',
    styleUrls: ['./email-field.component.scss'],
    providers: [MakeProvider(EmailFieldComponent)]
})
export class EmailFieldComponent extends AbstractValueAccessor implements OnInit {

    // formC: FormControl = new FormControl('')

    constructor() {
        super()
        // console.debug('constructor', this.formC)
    }

    // getErrorMessage() {
    //     if (this.formC.hasError('required')) {
    //         return 'You must enter an email'
    //     }
    //
    //     return this.formC.hasError('email') ? 'Not a valid email' : ''
    // }

    ngOnInit(): void {
        // console.debug('ngOnInit', this.formC)
        setTimeout(() => {
            console.debug('ngOnInit.value', this, this.value)
        }, 2000)

    }

}
