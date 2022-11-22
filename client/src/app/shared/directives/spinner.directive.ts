import { Directive, Input, ViewContainerRef } from '@angular/core'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'

// add to host display: grid
// add to replacement container - grid-area: 1 / 1;
@Directive({selector: '[appSpinner]'})
export class SpinnerDirective {

    constructor(
        private viewContainer: ViewContainerRef
    ) {
    }

    @Input()
    set appSpinner(isShow: boolean) {
        this.viewContainer.clear()
        if (isShow) {
            this.viewContainer.createComponent(SpinnerComponent)
        }
    }

}
