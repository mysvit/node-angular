import { Directive, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { MenuComponent } from '@standalone/menu/menu.component'
import { MenuModel } from '@standalone/menu/menu.model'
import { MenuPosition } from '@standalone/menu/menu.position'

@Directive({
    standalone: true,
    selector: '[appMenuPointer]'
})
export class MenuDirective {

    @Input()
    set appMenuPointer(menuRef: TemplateRef<any>) {
        this.menuRef = menuRef
    }

    @Input() items!: Array<MenuModel>

    @HostListener('click') onClickEvent() {
        this.showMenu()
    }

    menuRef?: TemplateRef<any>
    isShow: boolean = false

    constructor(
        private viewContainer: ViewContainerRef
    ) {
    }

    showMenu() {
        this.viewContainer.clear()
        const ref = this.viewContainer.createComponent(MenuComponent)
        if (ref) {
            ref.instance.position = MenuPosition.getPosition(this.viewContainer.element.nativeElement)
            ref.instance.items = this.items
            ref.instance.onMenuClose.subscribe(() => {
                ref.destroy()
            })
            this.menuRef?.createEmbeddedView(ref)
        }
    }

}
