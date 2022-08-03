import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-warn-message',
    templateUrl: './warn-message.component.html',
    styleUrls: ['./warn-message.component.scss']
})
export class WarnMessageComponent {

    // @HostBinding('style.display')
    // display = 'none'

    @Input()
    warnMessage?: string

    closeClick() {
        this.warnMessage = undefined
        // this.display = 'none'
    }

}
