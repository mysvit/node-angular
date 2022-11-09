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
    @Output() onCommentLike: EventEmitter<CommentItemUI> = new EventEmitter<CommentItemUI>()
    @Output() onCommentDislike: EventEmitter<CommentItemUI> = new EventEmitter<CommentItemUI>()
    @Output() onCommentReply: EventEmitter<CommentItemUI> = new EventEmitter<CommentItemUI>()
    @Output() onCommentRepliesShow: EventEmitter<CommentItemUI> = new EventEmitter<CommentItemUI>()
    @Output() onCommentEdit: EventEmitter<CommentItemUI> = new EventEmitter<CommentItemUI>()
    @Output() onCommentDelete: EventEmitter<CommentItemUI> = new EventEmitter<CommentItemUI>()


    menuOpened: boolean = false
    repliesShow: boolean = false

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

    commentRepliesShowClick() {
        this.repliesShow = !this.repliesShow
        this.onCommentRepliesShow.emit(this.item)
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
