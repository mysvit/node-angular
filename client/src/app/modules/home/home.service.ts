import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CommentsItem, CommentsLikesModel, CommentsTbl } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { Select } from '@shared-lib/db'
import { LikeDislikeCalc } from '@shared-lib/logic'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(
        private http: HttpClient
    ) {
    }

    commentAdd(tbl?: CommentsTbl): Observable<any> {
        return this.http.post(environment.apiEndPoint + ApiPath.comments_add, tbl)
    }

    commentGet(id: string) {
        return this.http.get(environment.apiEndPoint + ApiPath.comments_get.replace(ApiParams.id, id))
    }

    commentsList(select: Select): Observable<Array<CommentsItem>> {
        return this.http.post<Array<CommentsItem>>(environment.apiEndPoint + ApiPath.comments_list, select)
    }

    commentLike(model: CommentsLikesModel): Observable<LikeDislikeCalc> {
        return this.http.post<LikeDislikeCalc>(environment.apiEndPoint + ApiPath.comments_likes_set, model)
    }

}
