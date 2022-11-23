import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MessageType } from '@shared/enum'

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

    @Input() message?: string
    @Input() messageType?: MessageType
    @Input() duration?: number

    @Output() onClose: EventEmitter<void> = new EventEmitter<void>()

    snackBarStyle!: string

    constructor() {
    }

    ngOnInit(){
        switch (this.messageType) {
            case MessageType.Success:
                this.snackBarStyle = 'sl-snack-bar-success'
                // this.matSnackBar.openFromComponent(SnackBarComponent, {data: message, panelClass: 'sl-snack-bar-success', duration: duration})
                break
            case MessageType.Warn:
                this.snackBarStyle = 'sl-snack-bar-warn'
                // this.matSnackBar.openFromComponent(SnackBarComponent, {data: message, panelClass: 'sl-snack-bar-warn', duration: duration})
                break
            case MessageType.Error:
                this.snackBarStyle = 'sl-snack-bar-error'
                // this.matSnackBar.openFromComponent(SnackBarComponent, {data: message, panelClass: 'sl-snack-bar-error', duration: duration})
                break
            default:
                this.snackBarStyle = 'sl-snack-bar-info'
                // this.matSnackBar.openFromComponent(SnackBarComponent, {data: message, panelClass: 'sl-snack-bar-info', duration: duration})
                break
        }
    }

    handleCloseEvent() {
        this.onClose.emit()
    }

}
