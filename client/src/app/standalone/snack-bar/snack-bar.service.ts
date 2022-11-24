import { Injectable, ViewContainerRef } from '@angular/core'
import { SnackBarComponent } from './snack-bar.component'
import { SnackBarType } from './snack-bar.type'

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    snackBarRef?: ViewContainerRef

    show(message: string, messageType: SnackBarType, closeDelay?: number) {
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
