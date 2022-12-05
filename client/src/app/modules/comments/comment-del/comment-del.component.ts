import { Component, Input } from '@angular/core'
import { CommentDelModel } from './comment-del.model'

@Component({
    selector: 'app-comment-del',
    templateUrl: './comment-del.component.html',
    styleUrls: ['./comment-del.component.scss']
})
export class CommentDelComponent {

    @Input() data!: CommentDelModel

}
