import { Directive, ViewContainerRef } from '@angular/core'
import { DialogService } from '@standalone/dialog/dialog.service'

@Directive({
    standalone: true,
    selector: '[appDialog]'
})
export class DialogDirective {

    constructor(
        private viewContainer: ViewContainerRef,
        private dialog: DialogService
    ) {
        dialog.dialogRef = viewContainer
    }

}
