import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CommentsItem, CommentsTbl } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { Select } from '@shared-lib/db'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(
        private http: HttpClient
    ) {
    }

    addComments(tbl?: CommentsTbl): Observable<any> {
        return this.http.post(environment.apiEndPoint + ApiPath.comment_add, tbl)
    }

    getComments(id: string) {
        return this.http.get(environment.apiEndPoint + ApiPath.comment_get.replace(ApiParams.id, id))
    }

    listComments(select: Select): Observable<Array<CommentsItem>> {
        return this.http.post<Array<CommentsItem>>(environment.apiEndPoint + ApiPath.comment_list, select)
    }

}
