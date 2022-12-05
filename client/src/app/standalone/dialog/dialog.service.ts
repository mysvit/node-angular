import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core'
import { DialogConfigModel } from '@standalone/dialog/dialog-config.model'
import { DialogComponent } from '@standalone/dialog/dialog.component'

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    public dialogComponentRef?: ViewContainerRef
    public dialogContainerRef?: ComponentRef<DialogComponent>

    public config?: DialogConfigModel
    public component?: any

    open(component: any, config: DialogConfigModel) {
        this.component = component
        this.config = config
        this.dialogComponentRef?.clear()
        const componentRef = this.dialogComponentRef?.createComponent(DialogComponent)
        if (componentRef) {
            this.dialogContainerRef = componentRef
            componentRef.instance.onClose.subscribe(() => this.dialogComponentRef?.clear())
            return componentRef.instance
        }
        return
    }

}
