import { Component, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { CommentItem, CommentModel, CommentsSelectWhere } from '@dto'
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
    @ViewChild('spinner', {read: ViewContainerRef, static: true}) override spinnerRef?: ViewContainerRef

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
        public comments: CommentsService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.where.parent_id = this.parentId
        this.execute(
            concat(
                this.comments.commentsListCountApi(this.where),
                this.comments.commentsListApi(this.where)
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
            ref.instance.model = <CommentModel>{parentId: this.parentId}
            ref.instance.close.subscribe(() => ref.destroy())
        }
    }

    private commentRepliesData(item: CommentItemUI): Observable<boolean> {
        // selectLimit: <SelectLimit>{limit: 5}
        const where = <CommentsSelectWhere>{parent_id: item.comment_id}
        // if (this.searchWords) {
        //     where.search = this.searchWords
        // }
        return this.comments.commentsListApi(where)
            .pipe(
                map(items => item.commentReplies = items),
                switchMap(() => of(item.commentRepliesLoading = false))
            )
    }

    // private updateCommentItem(item: CommentItemUI, data: LikeDislikeCalc): void {
    //     item.like_user = data.likeUsr
    //     item.dislike_user = data.dislikeUsr
    //     item.likes_count = item.likes_count + data.likeCount
    //     item.dislikes_count = item.dislikes_count + data.dislikeCount
    // }

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
            this.comments.commentsListApi(this.where)
        )
    }

}
