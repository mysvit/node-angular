import { Component, Injector, OnInit } from '@angular/core'
import { CommentItem, CommentSet, CommentsLikesModel } from '@dto'
import { Select, SelectLimit } from '@shared-lib/db'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { ProcessForm } from '@shared/form'
import { map, Observable, of, switchMap } from 'rxjs'
import { CommentsService } from './comments.service'

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends ProcessForm implements OnInit {

    commentsList: Array<CommentItem> = []
    commentSet: CommentSet = <CommentSet>{}
    addId?: boolean
    replyId?: string
    editId?: string
    deleteId?: string

    constructor(
        injector: Injector,
        private comments: CommentsService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.execute(
            this.commentsListData()
        )
    }


    commentsListData(): Observable<Array<CommentItem>> {
        return this.comments.commentsList(<Select>{
            selectLimit: <SelectLimit>{limit: 5}
        })
            .pipe(
                map(items => this.commentsList = items)
            )
    }

    commentsTrackBy(index: number, item: CommentItem): string {
        return item.comment_id
    }



    commentAddClick(): void {
        if (!this.isAuth) return
        this.addId = true
        this.commentSet = <CommentSet>{}
    }

    saveCommentAddEvent(commentSet: CommentSet): void {
        this.execute(
            this.comments.commentAdd(commentSet)
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
        this.editId = item.comment_id
    }

    saveCommentEditEvent(item: CommentSet) {
        this.editId = undefined
    }

    cancelCommentEditEvent() {
        this.editId = undefined
    }



    commentReplyEvent(item: CommentItem) {
        this.replyId = item.comment_id
    }

    saveCommentReplyEvent(item: CommentSet) {
        this.replyId = undefined
    }

    cancelCommentReplyEvent() {
        this.replyId = undefined
    }



    commentDeleteEvent(item: CommentItem) {

    }



    commentLikeEvent(item: CommentItem): void {
        const model = <CommentsLikesModel>{
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

    commentDislikeEvent(item: CommentItem): void {
        const model = <CommentsLikesModel>{
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

    private updateCommentItem(item: CommentItem, data: LikeDislikeCalc): void {
        const index = this.commentsList.findIndex(f => f.comment_id === item.comment_id)
        this.commentsList[index] = {
            ...item,
            like_user: data.likeUsr,
            dislike_user: data.dislikeUsr,
            likes_count: item.likes_count + data.likeCount,
            dislikes_count: item.dislikes_count + data.dislikeCount
        }
    }


}
