import { CommonModule } from '@angular/common'
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MenuItemType, MenuModel } from '@standalone/menu/menu.model'

@Component({
    standalone: true,
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    imports: [
        CommonModule,
        FormsModule
    ],
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    @Input() items!: Array<MenuModel>
    @Input() position: any = {}

    @Output() onMenuClose: EventEmitter<void> = new EventEmitter<void>()

    @HostListener('click') click() {
        console.log('click')
        this.onMenuClose.emit()
    }

    MenuItemType = MenuItemType

}
