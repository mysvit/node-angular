import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommentItemUI } from '../comments/comments.model'

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

    @Input() isReplyItem: boolean = false
    @Input() item!: CommentItemUI
    @Output() onCommentLike: EventEmitter<void> = new EventEmitter<void>()
    @Output() onCommentDislike: EventEmitter<void> = new EventEmitter<void>()
    @Output() onCommentReply: EventEmitter<void> = new EventEmitter<void>()
    @Output() onCommentRepliesShow: EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() onCommentEdit: EventEmitter<void> = new EventEmitter<void>()
    @Output() onCommentDelete: EventEmitter<void> = new EventEmitter<void>()


    isMenuOpened: boolean = false
    isRepliesShowed: boolean = false

    constructor() {
    }

    ngOnInit(): void {
    }

    commentLikeClick() {
        this.onCommentLike.emit()
    }

    commentDislikeClick() {
        this.onCommentDislike.emit()
    }

    commentReplyClick() {
        this.onCommentReply.emit()
    }

    commentRepliesShowClick() {
        this.isRepliesShowed = !this.isRepliesShowed
        this.onCommentRepliesShow.emit(this.isRepliesShowed)
    }

    editCommentClick() {
        this.onCommentEdit.emit()
    }

    deleteCommentClick() {
        this.onCommentDelete.emit()
    }

    menuItemOpenedEvent() {
        this.isMenuOpened = true
    }

    menuItemClosedEvent() {
        this.isMenuOpened = false
    }

}
