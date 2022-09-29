import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CommentsTbl } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(
        private http: HttpClient
    ) {
    }

    getComments(id: string) {
        return this.http.get(environment.apiEndPoint + ApiPath.comment_get.replace(ApiParams.id, id))
    }

    addComments(tbl?: CommentsTbl): Observable<any> {
        return this.http.post(environment.apiEndPoint + ApiPath.comment_add, tbl)
    }

}
