import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MessageType } from '@shared/enum'

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private matSnackBar: MatSnackBar) {
    }

    show(message: string, messageType: MessageType) {
        switch (messageType) {
            case MessageType.Info:
                this.matSnackBar.open(message, 'X', {panelClass: 'sl-snack-bar-info'})
                break
            case MessageType.Success:
                this.matSnackBar.open(message, 'X', {panelClass: 'sl-snack-bar-success'})
                break
            case MessageType.Warn:
                this.matSnackBar.open(message, 'X', {panelClass: 'sl-snack-bar-warn'})
                break
            case MessageType.Error:
                this.matSnackBar.open(message, 'X', {panelClass: 'sl-snack-bar-error'})
                break
        }
    }

    dismiss() {
        this.matSnackBar.dismiss()
    }

}
