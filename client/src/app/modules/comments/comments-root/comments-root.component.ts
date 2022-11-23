import { Component, ViewChild } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { MessageType } from '@shared/enum'
import { CommentsComponent } from '../comments/comments.component'

@Component({
    selector: 'app-comments-root',
    templateUrl: './comments-root.component.html',
    styleUrls: ['./comments-root.component.scss']
})
export class CommentsRootComponent {

    @ViewChild(CommentsComponent) commentsComponent!: CommentsComponent

    searchWords?: string

    constructor(private snackBar: SnackBarService) {
    }

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

    snackOpen() {
        this.snackBar.show('test', MessageType.Success, 0)
    }

    snackClose() {
        this.snackBar.close()
    }

}
