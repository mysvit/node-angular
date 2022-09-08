import { ComponentRef, Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'

@Directive({selector: '[appSpinner]'})
export class SpinnerDirective {

    private templateView?: EmbeddedViewRef<any>
    private templateCreated = false

    private processView?: ComponentRef<SpinnerComponent>
    private spinnerCreated = false

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }

    // first parameters
    @Input()
    onTop: boolean = true

    // second parameters
    @Input()
    set appSpinner(showSpinner: boolean) {
        this.templateComponent(!showSpinner)
        this.spinnerComponent(showSpinner)
    }

    spinnerComponent(isShow: boolean) {
        if (isShow) {
            !this.spinnerCreated && (this.processView = this.viewContainer.createComponent(SpinnerComponent))
            this.spinnerCreated = true
        } else if (this.spinnerCreated) {
            const index = this.viewContainer.indexOf(this.processView?.hostView || <ViewRef>{})
            index < 0 ? this.viewContainer.clear() : this.viewContainer.remove(index)
            this.spinnerCreated = false
        }
    }

    templateComponent(isShow: boolean) {
        if (this.onTop) {
            !this.templateCreated && this.viewContainer.createEmbeddedView(this.templateRef)
            this.templateCreated = true
        } else {
            if (isShow) {
                !this.templateCreated && (this.templateView = this.viewContainer.createEmbeddedView(this.templateRef))
                this.templateCreated = true
            } else {
                if (this.templateCreated) {
                    const index = this.viewContainer.indexOf(this.templateView || <ViewRef>{})
                    index < 0 ? this.viewContainer.clear() : this.viewContainer.remove(index)
                    this.templateCreated = false
                }
            }
        }
    }

}
