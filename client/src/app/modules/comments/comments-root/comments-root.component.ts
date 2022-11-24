import { Component, ViewChild } from '@angular/core'
import { CommentsComponent } from '../comments/comments.component'

@Component({
    selector: 'app-comments-root',
    templateUrl: './comments-root.component.html',
    styleUrls: ['./comments-root.component.scss']
})
export class CommentsRootComponent {

    @ViewChild(CommentsComponent) commentsComponent!: CommentsComponent

    handleCommentSearchClick(searchWords: string) {
        this.commentsComponent.commentSearch(searchWords)
    }

    handleAddCommentClick() {
        this.commentsComponent.commentAdd()
    }

}
