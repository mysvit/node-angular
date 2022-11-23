import { Component, ViewChild } from '@angular/core'
import { CommentsComponent } from '../comments/comments.component'

@Component({
    selector: 'app-comments-root',
    templateUrl: './comments-root.component.html',
    styleUrls: ['./comments-root.component.scss']
})
export class CommentsRootComponent {

    @ViewChild(CommentsComponent) commentsComponent!: CommentsComponent

    searchWords?: string

    handleCommentSearchClick() {
        this.commentsComponent.commentSearch(this.searchWords)
    }

    handleCommentClearSearchClick() {
        this.searchWords = undefined
        this.commentsComponent.commentSearch(this.searchWords)
    }

    handleAddCommentClick() {
        this.commentsComponent.commentAdd()
    }

}
