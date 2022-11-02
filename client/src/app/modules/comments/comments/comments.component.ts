import { Component, Injector, OnInit } from '@angular/core'
import { CommentsItem, CommentsLikesModel } from '@dto'
import { Select, SelectLimit } from '@shared-lib/db'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { map } from 'rxjs'
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

    constructor(
        injector: Injector,
        private comments: CommentsService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.getData()
    }

    getData() {
        this.execute(
            this.commentsListData()
        )
    }

    commentsListData() {
        return this.comments.commentsList(<Select>{
            selectLimit: <SelectLimit>{limit: 5}
        })
            .pipe(
                map(items => this.commentsList = items)
            )
    }

    commentsTrackBy(index: number, item: CommentsItem) {
        return item.comment_id
    }

    addClick() {
        this.addComment = true
        // this.router.navigate([FormAction.Add, '0'], {relativeTo: this.activatedRoute}).finally()
    }

    commentLike(item: CommentsItem) {
        const model = <CommentsLikesModel>{
            comment_id: item.comment_id,
            is_like: 1,
            is_dislike: 0
        }
        this.execute(
            this.comments.commentLike(model)
                .pipe(
                    map(data => this.updateComment(item, data))
                )
        )
    }

    commentDislike(item: CommentsItem) {
        const model = <CommentsLikesModel>{
            comment_id: item.comment_id,
            is_like: 0,
            is_dislike: 1
        }
        this.execute(
            this.comments.commentLike(model)
                .pipe(
                    map(data => this.updateComment(item, data))
                )
        )
    }

    commentReply() {

    }

    private updateComment(item: CommentsItem, data: LikeDislikeCalc) {
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
