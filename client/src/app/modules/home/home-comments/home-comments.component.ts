import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormAction } from '@shared/enum'
import { SlStorage } from '@shared/storage'
import { HomeService } from '../home.service'

@Component({
    selector: 'app-home-comments',
    templateUrl: './home-comments.component.html',
    styleUrls: ['./home-comments.component.scss']
})
export class HomeCommentsComponent implements OnInit {

    SlStorage = SlStorage

    constructor(
        private home: HomeService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
    }

    addClick() {
        this.router.navigate([FormAction.Add, '0'], {relativeTo: this.activatedRoute}).finally()
    }

}
