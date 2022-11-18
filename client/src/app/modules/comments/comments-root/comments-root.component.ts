import { Component, OnInit, ViewChild } from '@angular/core'
import { CommentsComponent } from '../comments/comments.component'

@Component({
    selector: 'app-comments-root',
    templateUrl: './comments-root.component.html',
    styleUrls: ['./comments-root.component.scss']
})
export class CommentsRootComponent implements OnInit {

    @ViewChild(CommentsComponent) commentsComponent?: CommentsComponent

    searchWords?: string

    constructor() {
    }

    ngOnInit(): void {
    }

    handleCommentSearchClick(value: string | undefined) {
        this.searchWords = value
    }

    handleAddCommentClick() {
        this.commentsComponent?.commentAdd()
    }
}
