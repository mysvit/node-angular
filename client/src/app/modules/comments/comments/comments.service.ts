import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CommentItem, CommentLikeModel, CommentModel, CommentsSelectWhere } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(
        private http: HttpClient
    ) {
    }

    commentAdd(model: CommentModel): Observable<string> {
        return this.http.post<string>(environment.apiEndPoint + ApiPath.comments_add, model)
    }

    commentUpd(model: CommentModel): Observable<any> {
        return this.http.post(environment.apiEndPoint + ApiPath.comments_upd, model)
    }

    commentDel(commentId: string): Observable<any> {
        return this.http.delete(environment.apiEndPoint + ApiPath.comments_del.replace(ApiParams.id, commentId))
    }

    commentGet(id: string) {
        return this.http.get(environment.apiEndPoint + ApiPath.comments_get.replace(ApiParams.id, id))
    }

    commentsList(where: CommentsSelectWhere): Observable<Array<CommentItem>> {
        return this.http.post<Array<CommentItem>>(environment.apiEndPoint + ApiPath.comments_list, where)
    }

    commentsListCount(where: CommentsSelectWhere): Observable<number> {
        return this.http.post<number>(environment.apiEndPoint + ApiPath.comments_list_count, where)
    }

    commentLike(model: CommentLikeModel): Observable<LikeDislikeCalc> {
        return this.http.post<LikeDislikeCalc>(environment.apiEndPoint + ApiPath.comments_likes_set, model)
    }

}
