import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SnackBarComponent } from '@shared/components/snack-bar/snack-bar.component'
import { MessageType } from '@shared/enum'

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(
        private matSnackBar: MatSnackBar
    ) {
    }

    show(message: string, messageType: MessageType, duration?: number) {
        switch (messageType) {
            case MessageType.Info:
                this.matSnackBar.openFromComponent(SnackBarComponent, {data: message, panelClass: 'sl-snack-bar-info', duration: duration})
                break
            case MessageType.Success:
                this.matSnackBar.openFromComponent(SnackBarComponent, {data: message, panelClass: 'sl-snack-bar-success', duration: duration})
                break
            case MessageType.Warn:
                this.matSnackBar.openFromComponent(SnackBarComponent, {data: message, panelClass: 'sl-snack-bar-warn', duration: duration})
                break
            case MessageType.Error:
                this.matSnackBar.openFromComponent(SnackBarComponent, {data: message, panelClass: 'sl-snack-bar-error', duration: duration})
                break
        }
    }

    dismiss() {
        this.matSnackBar.dismiss()
    }

}
