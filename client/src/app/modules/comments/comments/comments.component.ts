import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core'
import { CommentItem, CommentModel, CommentsSelectWhere } from '@dto'
import { PaginatorEvent, PaginatorOptions } from '@shared/components/paginator/paginator.model'
import { FormAction } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { concat } from 'rxjs'
import { CommentFormComponent } from '../comment-form/comment-form.component'
import { CommentsService } from './comments.service'

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    providers: [CommentsService]
})
export class CommentsComponent extends ProcessForm implements OnInit, OnDestroy {

    @Input() level: number = 0
    @Input() parentId?: string
    @Input() background: string = 'transparent'

    @Output() onCommentDeleted: EventEmitter<void> = new EventEmitter<void>()

    @ViewChild('commentFormAddRef', {read: ViewContainerRef, static: true}) commentFormAddRef?: ViewContainerRef

    paginatorOptions: PaginatorOptions = {
        pageSize: 10,
        pagesMaxLength: 10
    }
    where: CommentsSelectWhere = <CommentsSelectWhere>{
        parent_id: undefined,
        search: undefined,
        limit: {offset: 0, fetch: 10}
    }

    private handleCommentDeletedEvent

    constructor(
        injector: Injector,
        public comments: CommentsService
    ) {
        super(injector)
        this.handleCommentDeletedEvent = comments.onCommentDeleted.subscribe(() => this.onCommentDeleted.emit())
    }

    ngOnInit(): void {
        this.where.parent_id = this.parentId
        this.getData(this.where)
    }

    ngOnDestroy(): void {
        this.handleCommentDeletedEvent.unsubscribe()
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

    commentSearch(value: string | undefined) {
        this.where.search = value
        this.getData(this.where)

    }

    handlePageChangeEvent(event: PaginatorEvent) {
        this.where.limit = event.limit
        this.execute(
            this.comments.commentsListApi(this.where)
        )
    }

    private getData(where: CommentsSelectWhere) {
        this.execute(
            concat(
                this.comments.commentsListCountApi(where),
                this.comments.commentsListApi(where)
            )
        )
    }

}
