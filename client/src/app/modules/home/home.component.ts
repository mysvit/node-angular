import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ClientPath } from '@shared-lib/constants'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.router.navigate([ClientPath.comments], {relativeTo: this.activatedRoute}).finally()
    }

    userClick() {
        // this.home.getUserProfile(SlStorage.userId).subscribe(data => console.debug(data))
    }

}
