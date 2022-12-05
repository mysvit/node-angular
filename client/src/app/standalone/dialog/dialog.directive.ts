import { Directive, ViewContainerRef } from '@angular/core'
import { DialogService } from '@standalone/dialog/dialog.service'

@Directive({
    standalone: true,
    selector: '[appDialog]'
})
export class DialogDirective {

    constructor(
        viewContainer: ViewContainerRef,
        dialog: DialogService
    ) {
        dialog.dialogComponentRef = viewContainer
    }

}
