import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CommentItem, CommentSet, CommentsLikesModel, CommentsTbl } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { Select } from '@shared-lib/db'
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

    commentAdd(commentSet: CommentSet): Observable<any> {
        return this.http.post(environment.apiEndPoint + ApiPath.comments_add, commentSet)
    }

    commentUpd(commentSet: CommentSet): Observable<any> {
        return this.http.post(environment.apiEndPoint + ApiPath.comments_upd, commentSet)
    }

    commentDel(tbl?: CommentsTbl): Observable<any> {
        return this.http.post(environment.apiEndPoint + ApiPath.comments_add, tbl)
    }

    commentGet(id: string) {
        return this.http.get(environment.apiEndPoint + ApiPath.comments_get.replace(ApiParams.id, id))
    }

    commentsList(select: Select): Observable<Array<CommentItem>> {
        return this.http.post<Array<CommentItem>>(environment.apiEndPoint + ApiPath.comments_list, select)
    }

    commentLike(model: CommentsLikesModel): Observable<LikeDislikeCalc> {
        return this.http.post<LikeDislikeCalc>(environment.apiEndPoint + ApiPath.comments_likes_set, model)
    }

}
