import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TrButton } from '@shared-lib/translation'

@Component({
    standalone: true,
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    @Input() title!: string
    @Input() content!: string
    @Input() okButtonLabel: string = TrButton.Ok
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>()

    handleCancelClick() {
        this.onClose.emit(false)
    }

    handleOkClick() {
        this.onClose.emit(true)
    }

}
