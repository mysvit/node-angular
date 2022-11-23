import { Injectable, ViewContainerRef } from '@angular/core'
import { SnackBarComponent } from '@core/components/snack-bar/snack-bar.component'
import { MessageType } from '@shared/enum'

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    snackBarRef?: ViewContainerRef

    show(message: string, messageType: MessageType, closeDelay?: number) {
        this.snackBarRef?.clear()
        const ref = this.snackBarRef?.createComponent(SnackBarComponent)
        if (ref) {
            if (closeDelay) {
                setTimeout(() => this.close(), closeDelay)
            }
            ref.instance.message = message
            ref.instance.messageType = messageType
            ref.instance.onClose.subscribe(() => this.close())
        }
    }

    close() {
        this.snackBarRef?.clear()
    }

}
