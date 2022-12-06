import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core'
import { CommentLikeModel } from '@dto'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { TrMessage, TrTitle } from '@shared-lib/translation'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { DialogService } from '@standalone/dialog/dialog.service'
import { MenuItemType, MenuModel } from '@standalone/menu/menu.model'
import { map } from 'rxjs'
import { CommentDelComponent } from '../comment-del/comment-del.component'
import { CommentDelModel } from '../comment-del/comment-del.model'
import { CommentItemUI } from '../comments/comments.model'
import { CommentsService } from '../comments/comments.service'

@Component({
    selector: 'app-comment-view',
    templateUrl: './comment-view.component.html',
    styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent extends ProcessForm implements OnInit {

    @Input() level!: number
    @Input() item!: CommentItemUI
    @Output() onCommentEdit: EventEmitter<void> = new EventEmitter<void>()
    @Output() onCommentReply: EventEmitter<void> = new EventEmitter<void>()
    @Output() onCommentRepliesShow: EventEmitter<boolean> = new EventEmitter<boolean>()

    items = [
        <MenuModel>{
            id: 0,
            type: MenuItemType.Button,
            icon: 'edit_note',
            text: 'Edit comment',
            click: this.handleEditCommentClick.bind(this)
        },
        <MenuModel>{
            id: 1,
            type: MenuItemType.ThematicBreak
        },
        <MenuModel>{
            id: 2,
            type: MenuItemType.Button,
            icon: 'delete',
            text: 'Delete comment',
            click: this.handleDeleteCommentClick.bind(this)
        }
    ]

    isRepliesShowed: boolean = false
    isMenuOpened: boolean = false
    isShowDeleteSpinner: boolean = false

    constructor(
        injector: Injector,
        public dialog: DialogService,
        private comments: CommentsService
    ) {
        super(injector)
    }

    ngOnInit(): void {
    }

    get isReply() {
        return this.level > 0
    }

    get isShowMenu() {
        return SlStorage.isAuth && this.item.user_id === SlStorage.user_id
    }

    handleCommentLikeClick() {
        const model = <CommentLikeModel>{
            comment_id: this.item.comment_id,
            is_like: 1,
            is_dislike: 0
        }
        this.execute(
            this.comments.commentLikeApi(model)
                .pipe(
                    map(data => this.updateCommentItem(this.item, data))
                )
        )
    }

    handleCommentDislikeClick() {
        const model = <CommentLikeModel>{
            comment_id: this.item.comment_id,
            is_like: 0,
            is_dislike: 1
        }
        this.execute(
            this.comments.commentLikeApi(model)
                .pipe(
                    map(data => this.updateCommentItem(this.item, data))
                )
        )
    }

    handleCommentReplyClick() {
        this.onCommentReply.emit()
    }

    handleCommentsRepliesShowClick(isShow?: boolean) {
        this.isRepliesShowed = isShow === undefined ? !this.isRepliesShowed : isShow
        this.onCommentRepliesShow.emit(this.isRepliesShowed)
    }

    handleEditCommentClick() {
        this.onCommentEdit.emit()
    }

    handleDeleteCommentClick() {
        const ref = this.dialog.open(CommentDelComponent, {
            data: <CommentDelModel>{title: TrTitle.DeleteComment, content: TrMessage.DoYouWantDelete}
        })
        if (ref) ref.onClose.subscribe(result => {
            if (result) {
                this.isShowDeleteSpinner = true
                this.execute(
                    this.comments.commentDelApi(this.item.comment_id)
                        .pipe(
                            map(result => result ? this.comments.commentsListDelItem(this.item) : undefined)
                        )
                )
            }
        })
    }

    override processCompleted(message?: any) {
        super.processCompleted(message)
        this.isShowDeleteSpinner = false
    }

    menuItemOpenedEvent() {
        this.isMenuOpened = true
    }

    menuItemClosedEvent() {
        this.isMenuOpened = false
    }

    private updateCommentItem(item: CommentItemUI, data: LikeDislikeCalc): void {
        item.like_user = data.likeUsr
        item.dislike_user = data.dislikeUsr
        item.likes_count = item.likes_count + data.likeCount
        item.dislikes_count = item.dislikes_count + data.dislikeCount
    }

}
