import { EventEmitter, Injectable, ViewContainerRef } from '@angular/core'
import { DialogComponent } from '@standalone/dialog/dialog.component'

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    public dialogRef?: ViewContainerRef

    onClose: EventEmitter<boolean> = new EventEmitter<boolean>()

    open(title: string, content: string, okButtonLabel?: string) {
        this.dialogRef?.clear()
        const ref = this.dialogRef?.createComponent(DialogComponent)
        if (ref) {
            // document.documentElement.style.overflow = 'hidden'
            ref.instance.title = title
            ref.instance.content = content
            ref.instance.onClose.subscribe(result => this.handleCloseEvent(result))
        }
    }

    handleCloseEvent(isOk: boolean) {
        document.documentElement.style.overflow = 'hidden'
        this.dialogRef?.clear()
        this.onClose.emit(isOk)
    }

}
