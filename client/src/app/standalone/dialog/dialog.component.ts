import { AfterViewInit, Component, EventEmitter, HostListener, Output, ViewChild, ViewContainerRef } from '@angular/core'
import { DialogService } from '@standalone/dialog/dialog.service'

@Component({
    standalone: true,
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {

    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>()

    @HostListener('click') click() {
        this.backdropClick()
    }

    height?: string
    width?: string

    @ViewChild('dialogRef', {read: ViewContainerRef, static: false}) dialogRef?: ViewContainerRef

    constructor(
        private dialog: DialogService
    ) {
        this.height = dialog.config?.height
        this.width = dialog.config?.width
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.dialogRef?.clear()
            const ref = this.dialogRef?.createComponent(this.dialog.component)
            if (ref) {
                (<any>ref.instance).data = this.dialog.config?.data
            }
        }, 1)
    }

    backdropClick() {
        this.onClose.emit(false)
    }

    okClick() {
        this.onClose.emit(true)
    }

}
