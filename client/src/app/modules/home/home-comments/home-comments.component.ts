import { Component, Injector, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CommentsItem } from '@dto'
import { Select, SelectLimit } from '@shared-lib/db'
import { FormAction } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { SlStorage } from '@shared/storage'
import { map } from 'rxjs'
import { HomeService } from '../home.service'

@Component({
    selector: 'app-home-comments',
    templateUrl: './home-comments.component.html',
    styleUrls: ['./home-comments.component.scss']
})
export class HomeCommentsComponent extends ProcessForm implements OnInit {

    SlStorage = SlStorage
    commentsList: Array<CommentsItem> = []

    constructor(
        injector: Injector,
        private home: HomeService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.getData()
    }

    getData() {
        const select = <Select>{
            selectLimit: <SelectLimit>{limit: 5}
        }
        this.execute(
            this.home.listComments(select)
                .pipe(
                    map(items => this.commentsList = items)
                )
        )
    }

    addClick() {
        this.router.navigate([FormAction.Add, '0'], {relativeTo: this.activatedRoute}).finally()
    }

}
