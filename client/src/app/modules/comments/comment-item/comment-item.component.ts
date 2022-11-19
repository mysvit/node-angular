import { Component, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { CommentModel } from '@dto'
import { FormAction } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
import { CommentFormComponent } from '../comment-form/comment-form.component'
import { CommentViewComponent } from '../comment-view/comment-view.component'
import { CommentsComponent } from '../comments/comments.component'
import { CommentItemUI } from '../comments/comments.model'
import { CommentsService } from '../comments/comments.service'

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent extends ProcessForm implements OnInit {

    @Input() level: number = 0
    @Input() item!: CommentItemUI
    // @Output() onCommentLike: EventEmitter<void> = new EventEmitter<void>()
    // @Output() onCommentDislike: EventEmitter<void> = new EventEmitter<void>()
    // @Output() onCommentReply: EventEmitter<void> = new EventEmitter<void>()
    // @Output() onCommentRepliesShow: EventEmitter<boolean> = new EventEmitter<boolean>()
    // @Output() onCommentEdit: EventEmitter<void> = new EventEmitter<void>()
    // @Output() onCommentDelete: EventEmitter<void> = new EventEmitter<void>()

    // FormAction = FormAction
    // isMenuOpened: boolean = false
    // isRepliesShowed: boolean = false

    // get isShowMenu() {
    //     return SlStorage.isAuth && this.item.user_id === SlStorage.user_id
    // }

    @ViewChild('commentRef', {read: ViewContainerRef, static: true}) commentRef?: ViewContainerRef
    @ViewChild('commentsRepliesRef', {read: ViewContainerRef, static: true}) commentsRepliesRef?: ViewContainerRef

    constructor(
        injector: Injector,
        private comments: CommentsService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.showCommentItem()
    }

    private showCommentItem(): void {
        this.commentRef?.clear()
        const ref = this.commentRef?.createComponent<CommentViewComponent>(CommentViewComponent, {})
        if (ref) {
            ref.instance.level = this.level
            ref.instance.item = this.item
            ref.instance.onCommentEdit.subscribe(() => this.showCommentFormEdit())
            ref.instance.onCommentRepliesShow.subscribe(isShow => this.showCommentsReplies(isShow))
        }
    }

    private showCommentFormEdit(): void {
        this.commentRef?.clear()
        const ref = this.commentRef?.createComponent<CommentFormComponent>(CommentFormComponent, {})
        if (ref) {
            ref.instance.formAction = FormAction.Upd
            ref.instance.model = <CommentModel>{commentId: this.item.comment_id, parentId: this.item.parent_id, comment: this.item.comment}
            ref.instance.close.subscribe(() => this.showCommentItem())
        }
    }

    private showCommentsReplies(isShow: boolean): void {
        this.commentsRepliesRef?.clear()
        if (!isShow) return
        const ref = this.commentsRepliesRef?.createComponent<CommentsComponent>(CommentsComponent, {})
        if (ref) {
            ref.instance.level = this.level + 1
            ref.instance.parentId = this.item.comment_id
            ref.instance.background = PictureHelper.getRandomBackground()
        }
    }

    // handleCommentLikeClick() {
    //     const model = <CommentLikeModel>{
    //         comment_id: this.item.comment_id,
    //         is_like: 1,
    //         is_dislike: 0
    //     }
    //     this.execute(
    //         this.comments.commentLike(model)
    //             .pipe(
    //                 map(data => this.updateCommentItem(this.item, data))
    //             )
    //     )
    // }
    //
    // handleCommentDislikeClick() {
    //     const model = <CommentLikeModel>{
    //         comment_id: this.item.comment_id,
    //         is_like: 0,
    //         is_dislike: 1
    //     }
    //     this.execute(
    //         this.comments.commentLike(model)
    //             .pipe(
    //                 map(data => this.updateCommentItem(this.item, data))
    //             )
    //     )
    // }
    //
    // handleCommentReplyClick() {
    //     // this.onCommentReply.emit()
    // }
    //
    // handleCommentsRepliesShowClick() {
    //     this.isRepliesShowed = !this.isRepliesShowed
    // }
    //
    // editCommentClick() {
    //     // this.onCommentEdit.emit()
    // }
    //
    // deleteCommentClick() {
    //     // this.onCommentDelete.emit()
    // }
    //
    // menuItemOpenedEvent() {
    //     this.isMenuOpened = true
    // }
    //
    // menuItemClosedEvent() {
    //     this.isMenuOpened = false
    // }
    //
    // private updateCommentItem(item: CommentItemUI, data: LikeDislikeCalc): void {
    //     item.like_user = data.likeUsr
    //     item.dislike_user = data.dislikeUsr
    //     item.likes_count = item.likes_count + data.likeCount
    //     item.dislikes_count = item.dislikes_count + data.dislikeCount
    // }

}
