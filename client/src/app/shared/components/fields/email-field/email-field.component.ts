import { Component, OnInit } from '@angular/core'
import { AbstractValueAccessor, MakeProvider } from '../abstract-value-accessor'

@Component({
    selector: 'app-email-field',
    templateUrl: './email-field.component.html',
    styleUrls: ['./email-field.component.scss'],
    providers: [MakeProvider(EmailFieldComponent)]
})
export class EmailFieldComponent extends AbstractValueAccessor implements OnInit {

    constructor() {
        super()
    }

    ngOnInit(): void {
        setTimeout(() => {
            console.debug('ngOnInit.value', this, this.value)
        }, 2000)
    }

}
