import { Component, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CommentItem, CommentModel, CommentsSelectWhere } from '@dto'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { PaginatorEvent, PaginatorOptions } from '@shared/components/paginator/paginator.model'
import { FormAction } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { concat, map, Observable, of, switchMap } from 'rxjs'
import { CommentFormComponent } from '../comment-form/comment-form.component'
import { CommentItemUI } from './comments.model'
import { CommentsService } from './comments.service'

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    providers: [CommentsService]
})
export class CommentsComponent extends ProcessForm implements OnInit {

    @Input() level: number = 0
    @Input() parentId?: string
    @Input() background: string = 'transparent'

    @ViewChild('commentFormAddRef', {read: ViewContainerRef, static: true}) commentFormAddRef?: ViewContainerRef

    commentsList: Array<CommentItemUI> = []
    commentsListCount: number = 0
    paginatorOptions: PaginatorOptions = {
        pageSize: 10,
        pagesMaxLength: 10
    }
    where: CommentsSelectWhere = <CommentsSelectWhere>{
        parent_id: undefined,
        search: undefined,
        limit: {offset: 0, fetch: 10}
    }

    constructor(
        injector: Injector,
        public dialog: MatDialog,
        private comments: CommentsService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.where.parent_id = this.parentId
        this.execute(
            concat(
                this.commentsListDataCount(),
                this.commentsListData(this.where)
            )
        )
    }

    commentsTrackBy(index: number, item: CommentItem): string {
        return item.comment_id
    }

    commentAdd(): void {
        if (!this.isAuth) return
        this.commentFormAddRef?.clear()
        const ref = this.commentFormAddRef?.createComponent<CommentFormComponent>(CommentFormComponent, {})
        if (ref) {
            ref.instance.formAction = FormAction.Add
            ref.instance.parentId = this.parentId
            ref.instance.close.subscribe(() => ref.destroy())
        }
    }

    saveCommentAddEvent(model: CommentModel): void {
        // this.execute(
        //     this.comments.commentAdd(model)
        //         .pipe(
        //             switchMap(() => this.commentsListData()),
        //             switchMap(() => of(this.addId = false))
        //         )
        // )
    }

    cancelCommentAddEvent(): void {
        // this.addId = false
    }


    handleCommentEditEvent(item: CommentItem) {
        // this.editCommentModel = <CommentModel>{commentId: item.comment_id, parentId: item.parent_id, comment: item.comment}
        // this.editId = item.comment_id
    }

    handleSaveCommentEditEvent(CommentModel: CommentModel) {
        // this.execute(
        //     this.comments.commentUpd(CommentModel)
        //         .pipe(
        //             switchMap(() => this.commentsListData()),
        //             switchMap(() => of(this.editId = undefined))
        //         )
        // )
    }

    handleCancelCommentEditEvent() {
        // this.editId = undefined
    }


    handleCommentReplyEvent(item: CommentItemUI) {
        // if (!this.isAuth) return
        // this.replyCommentModel = <CommentModel>{parentId: item.comment_id}
        // this.replyId = item.comment_id
    }


    // TODO - add message what your comment added to the end
    handleSaveCommentReplyEvent(model: CommentModel, parentItem: CommentItemUI) {
        // this.execute(
        //     this.comments.commentAdd(model)
        //         .pipe(
        //             map(() => {
        //                 parentItem.replies_count = parentItem.replies_count ? parentItem.replies_count + 1 : 1
        //                 if (parentItem.isRepliesShowed) {
        //                     return this.commentsListData()
        //                 } else {
        //                     parentItem.commentReplies = []
        //                 }
        //                 return
        //             }),
        //             switchMap(() => of(this.replyId = undefined))
        //         )
        // )
    }

    handleCancelCommentReplyEvent() {
        // this.replyId = undefined
    }


    handleCommentRepliesShowEvent(item: CommentItemUI, isRepliesShowed: boolean) {
        // item.isRepliesShowed = isRepliesShowed
        // if (isRepliesShowed && ValueHelper.isEmpty(item.commentReplies)) {
        //     item.commentRepliesLoading = true
        //     this.execute(
        //         this.commentRepliesData(item)
        //     )
        // }
    }


    handleCommentDeleteEvent(item: CommentItemUI) {
        // const dialogRef = this.dialog.open(DialogComponent, {
        //     width: '350px',
        //     data: <DialogModel>{action: DialogAction.Delete, title: TrTitle.DeleteComment, content: TrMessage.DoYouWantDelete}
        // })
        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.execute(
        //             this.comments.commentDel(item.comment_id)
        //                 .pipe(
        //                     switchMap((result) => {
        //                         if (result) {
        //                             return this.commentsListData()
        //                         } else {
        //                             return of(undefined)
        //                         }
        //                     })
        //                 )
        //         )
        //     }
        // })
    }


    // handleCommentLikeEvent(item: CommentItemUI): void {
    //     const model = <CommentLikeModel>{
    //         comment_id: item.comment_id,
    //         is_like: 1,
    //         is_dislike: 0
    //     }
    //     this.execute(
    //         this.comments.commentLike(model)
    //             .pipe(
    //                 map(data => this.updateCommentItem(item, data))
    //             )
    //     )
    // }

    // handleCommentDislikeEvent(item: CommentItemUI): void {
    //     const model = <CommentLikeModel>{
    //         comment_id: item.comment_id,
    //         is_like: 0,
    //         is_dislike: 1
    //     }
    //     this.execute(
    //         this.comments.commentLike(model)
    //             .pipe(
    //                 map(data => this.updateCommentItem(item, data))
    //             )
    //     )
    // }

    private commentsListData(where: CommentsSelectWhere): Observable<Array<CommentItem>> {
        return this.comments.commentsList(this.where)
            .pipe(
                map(items => this.commentsList = <Array<CommentItemUI>>items)
            )
    }

    private commentsListDataCount(): Observable<number> {
        return this.comments.commentsListCount(this.where)
            .pipe(
                map(count => this.commentsListCount = count)
            )
    }


    private commentRepliesData(item: CommentItemUI): Observable<boolean> {
        // selectLimit: <SelectLimit>{limit: 5}
        const where = <CommentsSelectWhere>{parent_id: item.comment_id}
        // if (this.searchWords) {
        //     where.search = this.searchWords
        // }
        return this.comments.commentsList(where)
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

    //
    // handleCommentSearchClick(value: string | undefined) {
    //     this.searchWords = value
    //     this.execute(
    //         concat(
    //             this.commentsListDataCount(),
    //             this.commentsListData()
    //         )
    //     )
    // }

    handlePageChangeEvent(event: PaginatorEvent) {
        this.where.limit = event.limit
        this.execute(
            this.commentsListData(this.where)
        )
    }

}
