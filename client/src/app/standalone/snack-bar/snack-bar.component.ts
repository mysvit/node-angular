import { NgClass } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { SnackBarType } from './snack-bar.type'

@Component({
    standalone: true,
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    imports: [
        MatIconModule,
        NgClass,
        MatButtonModule
    ],
    styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

    @Input() message?: string
    @Input() messageType?: SnackBarType
    @Input() duration?: number

    @Output() onClose: EventEmitter<void> = new EventEmitter<void>()

    snackBarStyle!: string

    constructor() {
    }

    ngOnInit() {
        switch (this.messageType) {
            case SnackBarType.Success:
                this.snackBarStyle = 'sl-snack-bar-success'
                break
            case SnackBarType.Warn:
                this.snackBarStyle = 'sl-snack-bar-warn'
                break
            case SnackBarType.Error:
                this.snackBarStyle = 'sl-snack-bar-error'
                break
            default:
                this.snackBarStyle = 'sl-snack-bar-info'
                break
        }
    }

    handleCloseEvent() {
        this.onClose.emit()
    }

}
