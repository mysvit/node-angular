import { Component, Injector, OnInit } from '@angular/core'
import { CommentSet, CommentsItem, CommentsLikesModel } from '@dto'
import { Select, SelectLimit } from '@shared-lib/db'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { map, Observable, of, switchMap } from 'rxjs'
import { CommentFormModel } from '../comment-form/comment.form-model'
import { CommentsService } from './comments.service'

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends ProcessForm implements OnInit {

    SlStorage = SlStorage
    commentsList: Array<CommentsItem> = []
    addComment = false
    commentSet: CommentSet = <CommentSet>{}

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

    commentsListData(): Observable<Array<CommentsItem>> {
        return this.comments.commentsList(<Select>{
            selectLimit: <SelectLimit>{limit: 5}
        })
            .pipe(
                map(items => this.commentsList = items)
            )
    }

    commentsTrackBy(index: number, item: CommentsItem): string {
        return item.comment_id
    }

    addCommentClick(): void {
        if (!this.isAuth) return
        this.addComment = true
        this.commentSet = <CommentSet>{comment: ''}
    }

    addCommentEvent(model: CommentFormModel): void {
        this.execute(
            this.comments.commentAdd(model.formGroup.getRawValue())
                .pipe(
                    switchMap(() => this.commentsListData()),
                    switchMap(() => of(this.addComment = false))
                )
        )
    }

    cancelAddCommentEvent(): void {
        this.addComment = false
    }

    commentLikeClick(item: CommentsItem): void {
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

    commentDislikeClick(item: CommentsItem): void {
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

    private updateCommentItem(item: CommentsItem, data: LikeDislikeCalc): void {
        const index = this.commentsList.findIndex(f => f.comment_id === item.comment_id)
        this.commentsList[index] = {
            ...item,
            like_user: data.likeUsr,
            dislike_user: data.dislikeUsr,
            likes_count: item.likes_count + data.likeCount,
            dislikes_count: item.dislikes_count + data.dislikeCount
        }
    }

    commentReplyClick(): void {

    }

}
