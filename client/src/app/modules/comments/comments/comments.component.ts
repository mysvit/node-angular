import { Component, Injector, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DialogModel } from '@core/components/dialog/dialog-model'
import { DialogComponent } from '@core/components/dialog/dialog.component'
import { CommentItem, CommentLikeModel, CommentModel, CommentsSelectWhere } from '@dto'
import { ValueHelper } from '@shared-lib/helpers'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { TrMessage, TrTitle } from '@shared-lib/translation'
import { FormAction } from '@shared/enum'
import { DialogAction } from '@shared/enum/dialog-action'
import { ProcessForm } from '@shared/form'
import { map, Observable, of, switchMap } from 'rxjs'
import { CommentItemUI } from './comments.model'
import { CommentsService } from './comments.service'

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends ProcessForm implements OnInit {

    FormAction = FormAction
    commentsList: Array<CommentItemUI> = []
    addCommentModel: CommentModel = <CommentModel>{}
    editCommentModel: CommentModel = <CommentModel>{}
    replyCommentModel: CommentModel = <CommentModel>{}
    addId?: boolean
    editId?: string
    replyId?: string
    deleteId?: string

    constructor(
        injector: Injector,
        public dialog: MatDialog,
        private comments: CommentsService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.execute(
            this.commentsListData()
        )
    }

    commentsTrackBy(index: number, item: CommentItem): string {
        return item.comment_id
    }


    commentAddClick(): void {
        if (!this.isAuth) return
        this.addCommentModel = <CommentModel>{}
        this.addId = true
    }

    saveCommentAddEvent(model: CommentModel): void {
        this.execute(
            this.comments.commentAdd(model)
                .pipe(
                    switchMap(() => this.commentsListData()),
                    switchMap(() => of(this.addId = false))
                )
        )
    }

    cancelCommentAddEvent(): void {
        this.addId = false
    }


    commentEditEvent(item: CommentItem) {
        this.editCommentModel = <CommentModel>{commentId: item.comment_id, parentId: item.parent_id, comment: item.comment}
        this.editId = item.comment_id
    }

    saveCommentEditEvent(CommentModel: CommentModel) {
        this.execute(
            this.comments.commentUpd(CommentModel)
                .pipe(
                    switchMap(() => this.commentsListData()),
                    switchMap(() => of(this.editId = undefined))
                )
        )
    }

    cancelCommentEditEvent() {
        this.editId = undefined
    }


    commentReplyEvent(item: CommentItemUI) {
        if (!this.isAuth) return
        this.replyCommentModel = <CommentModel>{parentId: item.comment_id}
        this.replyId = item.comment_id
    }


    // TODO - add message what your comment added to the end
    saveCommentReplyEvent(model: CommentModel, parentItem: CommentItemUI) {
        this.execute(
            this.comments.commentAdd(model)
                .pipe(
                    map(() => {
                        parentItem.replies_count = parentItem.replies_count ? parentItem.replies_count + 1 : 1
                        if (parentItem.isRepliesShowed) {
                            return this.commentsListData()
                        } else {
                            parentItem.commentReplies = []
                        }
                        return
                    }),
                    switchMap(() => of(this.replyId = undefined))
                )
        )
    }

    cancelCommentReplyEvent() {
        this.replyId = undefined
    }


    commentRepliesShowEvent(item: CommentItemUI, isRepliesShowed: boolean) {
        item.isRepliesShowed = isRepliesShowed
        if (isRepliesShowed && ValueHelper.isEmpty(item.commentReplies)) {
            item.commentRepliesLoading = true
            this.execute(
                this.commentRepliesData(item)
            )
        }
    }


    commentDeleteEvent(item: CommentItemUI) {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '350px',
            data: <DialogModel>{action: DialogAction.Delete, title: TrTitle.DeleteComment, content: TrMessage.DoYouWantDelete}
        })
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.execute(
                    this.comments.commentDel(item.comment_id)
                        .pipe(
                            switchMap((result) => {
                                if (result) {
                                    return this.commentsListData()
                                } else {
                                    return of(undefined)
                                }
                            })
                        )
                )
            }
        })
    }


    commentLikeEvent(item: CommentItemUI): void {
        const model = <CommentLikeModel>{
            comment_id: item.comment_id,
            is_like: 1,
            is_dislike: 0
        }
        this.execute(
            this.comments.commentLike(model)
                .pipe(
                    map(data => this.updateCommentItem(item, data))
                )
        )
    }

    commentDislikeEvent(item: CommentItemUI): void {
        const model = <CommentLikeModel>{
            comment_id: item.comment_id,
            is_like: 0,
            is_dislike: 1
        }
        this.execute(
            this.comments.commentLike(model)
                .pipe(
                    map(data => this.updateCommentItem(item, data))
                )
        )
    }


    private commentsListData(): Observable<Array<CommentItem>> {
        // selectLimit: <SelectLimit>{limit: 5}
        return this.comments.commentsList(<CommentsSelectWhere>{})
            .pipe(
                map(items => this.commentsList = <Array<CommentItemUI>>items)
            )
    }

    private commentRepliesData(item: CommentItemUI): Observable<boolean> {
        // selectLimit: <SelectLimit>{limit: 5}
        return this.comments.commentsList(<CommentsSelectWhere>{parent_id: item.comment_id})
            .pipe(
                map(items => item.commentReplies = items),
                switchMap(() => of(item.commentRepliesLoading = false))
            )
    }

    private updateCommentItem(item: CommentItemUI, data: LikeDislikeCalc): void {
        item.like_user = data.likeUsr
        item.dislike_user = data.dislikeUsr
        item.likes_count = item.likes_count + data.likeCount
        item.dislikes_count = item.dislikes_count + data.dislikeCount
    }

}
