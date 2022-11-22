import { HttpClient } from '@angular/common/http'
import { EventEmitter, Injectable } from '@angular/core'
import { CommentItem, CommentLikeModel, CommentModel, CommentsSelectWhere } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { map, Observable } from 'rxjs'
import { CommentItemUI } from './comments.model'

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    commentsList: Array<CommentItemUI> = []
    commentsListCount: number = 0
    onCommentDeleted: EventEmitter<void> = new EventEmitter<void>()

    constructor(
        private http: HttpClient
    ) {
    }

    commentAddApi(model: CommentModel): Observable<string> {
        return this.http.post<string>(environment.apiEndPoint + ApiPath.comments_add, model)
    }

    commentUpdApi(model: CommentModel): Observable<any> {
        return this.http.post(environment.apiEndPoint + ApiPath.comments_upd, model)
    }

    commentDelApi(commentId: string): Observable<any> {
        return this.http.delete(environment.apiEndPoint + ApiPath.comments_del.replace(ApiParams.id, commentId))
    }

    commentGetApi(id: string) {
        return this.http.get(environment.apiEndPoint + ApiPath.comments_get.replace(ApiParams.id, id))
    }

    commentsListApi(where: CommentsSelectWhere): Observable<Array<CommentItem>> {
        return this.http.post<Array<CommentItem>>(environment.apiEndPoint + ApiPath.comments_list, where)
            .pipe(
                map(items => this.commentsList = <Array<CommentItemUI>>items)
            )
    }

    commentsListCountApi(where: CommentsSelectWhere): Observable<number> {
        return this.http.post<number>(environment.apiEndPoint + ApiPath.comments_list_count, where)
            .pipe(
                map(count => this.commentsListCount = count)
            )
    }

    commentLikeApi(model: CommentLikeModel): Observable<LikeDislikeCalc> {
        return this.http.post<LikeDislikeCalc>(environment.apiEndPoint + ApiPath.comments_likes_set, model)
    }

    commentsListDelItem(item: CommentItemUI) {
        const index = this.commentsList.findIndex(f => f.comment_id === item.comment_id)
        this.commentsList.splice(index, 1)
        this.commentsListCount--
        this.onCommentDeleted.emit()
    }

}
