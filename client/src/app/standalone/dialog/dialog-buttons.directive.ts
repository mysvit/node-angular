import { Directive, HostListener } from '@angular/core'
import { DialogService } from '@standalone/dialog/dialog.service'

@Directive({
    standalone: true,
    selector: '[appDialogOk]'
})
export class DialogOkDirective {

    @HostListener('click')
    click() {
        this.dialog.dialogContainerRef?.instance.okClick()
    }

    constructor(
        private dialog: DialogService
    ) {
    }

}

@Directive({
    standalone: true,
    selector: '[appDialogCancel]'
})
export class DialogCancelDirective {

    @HostListener('click')
    click() {
        this.dialog.dialogContainerRef?.instance.backdropClick()
    }

    constructor(
        private dialog: DialogService
    ) {
    }

}
