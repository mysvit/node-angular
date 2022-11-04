import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommentItem } from '@dto'

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

    @Input() item!: CommentItem
    @Output() onCommentLike: EventEmitter<CommentItem> = new EventEmitter<CommentItem>()
    @Output() onCommentDislike: EventEmitter<CommentItem> = new EventEmitter<CommentItem>()
    @Output() onCommentReply: EventEmitter<CommentItem> = new EventEmitter<CommentItem>()
    @Output() onCommentEdit: EventEmitter<CommentItem> = new EventEmitter<CommentItem>()
    @Output() onCommentDelete: EventEmitter<CommentItem> = new EventEmitter<CommentItem>()

    menuOpened: boolean = false

    constructor() {
    }

    ngOnInit(): void {
    }

    commentLikeClick() {
        this.onCommentLike.emit(this.item)
    }

    commentDislikeClick() {
        this.onCommentDislike.emit(this.item)
    }

    commentReplyClick() {
        this.onCommentReply.emit(this.item)
    }

    editCommentClick() {
        this.onCommentEdit.emit(this.item)
    }

    deleteCommentClick() {
        this.onCommentDelete.emit(this.item)
    }

    menuItemOpenedEvent() {
        this.menuOpened = true
    }

    menuItemClosedEvent() {
        this.menuOpened = false
    }

}
