import { Component, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { CommentModel } from '@dto'
import { FormAction } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { PictureHelper } from '@shared/helper'
import { CommentFormComponent } from '../comment-form/comment-form.component'
import { CommentViewComponent } from '../comment-view/comment-view.component'
import { CommentsComponent } from '../comments/comments.component'
import { CommentItemUI } from '../comments/comments.model'

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html'
})
export class CommentItemComponent extends ProcessForm implements OnInit {

    @Input() level: number = 0
    @Input() item!: CommentItemUI

    @ViewChild('commentRef', {read: ViewContainerRef, static: true}) commentRef!: ViewContainerRef
    @ViewChild('commentReplyRef', {read: ViewContainerRef, static: true}) commentReplyRef!: ViewContainerRef
    @ViewChild('commentsRepliesRef', {read: ViewContainerRef, static: true}) commentsRepliesRef!: ViewContainerRef

    constructor(
        injector: Injector
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.showCommentItem()
    }

    private showCommentItem(): void {
        this.commentRef.clear()
        const ref = this.commentRef.createComponent<CommentViewComponent>(CommentViewComponent, {})
        if (ref) {
            ref.instance.level = this.level
            ref.instance.item = this.item
            ref.instance.onCommentEdit.subscribe(() => this.showCommentFormEdit())
            ref.instance.onCommentReply.subscribe(() => this.showCommentFormReply())
            ref.instance.onCommentRepliesShow.subscribe(isShow => this.showCommentsReplies(isShow))
        }
    }

    private showCommentFormEdit(): void {
        this.commentRef.clear()
        const ref = this.commentRef.createComponent<CommentFormComponent>(CommentFormComponent, {})
        if (ref) {
            ref.instance.formAction = FormAction.Upd
            ref.instance.model = <CommentModel>{commentId: this.item.comment_id, parentId: this.item.parent_id, comment: this.item.comment}
            ref.instance.close.subscribe((result: CommentModel) => {
                if (result) this.item.comment = result.comment
                this.showCommentItem()
            })
        }
    }

    private showCommentFormReply(): void {
        if (!this.isAuth) return
        if (this.commentReplyRef.length > 0) return
        this.commentReplyRef.clear()
        const ref = this.commentReplyRef.createComponent<CommentFormComponent>(CommentFormComponent, {})
        if (ref) {
            ref.instance.formAction = FormAction.Reply
            ref.instance.model = <CommentModel>{parentId: this.item.comment_id}
            ref.instance.smallIcon = true
            ref.instance.close.subscribe((result: CommentModel) => {
                ref.destroy()
                if (result) this.item.replies_count++
            })
        }
    }

    private showCommentsReplies(isShow: boolean): void {
        this.item.isRepliesShowed = isShow
        this.commentsRepliesRef.clear()
        if (!isShow) return
        const ref = this.commentsRepliesRef.createComponent<CommentsComponent>(CommentsComponent, {})
        if (ref) {
            ref.instance.level = this.level + 1
            ref.instance.parentId = this.item.comment_id
            ref.instance.background = PictureHelper.getRandomBackground()
            ref.instance.onCommentDeleted.subscribe(() => this.handleCommentReplyDeletedEvent())
        }
    }

    // child element deleted
    private handleCommentReplyDeletedEvent() {
        this.item.replies_count--
        if (this.item.replies_count < 1) this.showCommentsReplies(false)
    }

}
