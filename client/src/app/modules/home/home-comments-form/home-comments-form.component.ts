import { Component, Injector, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { ClientPath, Props } from '@shared-lib/constants'
import { ValueHelper } from '@shared-lib/helpers'
import { FormAction } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { FieldValidators } from '@shared/validators'
import { map } from 'rxjs'
import { v4 as uuid4 } from 'uuid'
import { HomeService } from '../home.service'
import { HomeCommentsFormModel } from './home-comments.form-model'

@Component({
    selector: 'app-home-comments-form',
    templateUrl: './home-comments-form.component.html',
    styleUrls: ['./home-comments-form.component.scss']
})
export class HomeCommentsFormComponent extends ProcessForm implements OnInit {

    FieldValidators = FieldValidators
    formModel = new HomeCommentsFormModel()

    constructor(
        injector: Injector,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private home: HomeService
    ) {
        super(injector)
        this.snackBar?.dismiss()
        this.activatedRoute.paramMap
            .pipe(
                map((params: ParamMap) => {
                    this.formModel.formAction = <FormAction>(params.get(Props.action) || FormAction.View)
                    if (this.formModel.formAction !== FormAction.Add && ValueHelper.isEmpty(params.get(Props.id))) {
                        this.execute(this.home.getComments(params.get(Props.id) || ''))
                    }
                })
            )
            .subscribe()
    }

    ngOnInit(): void {
    }

    saveClick() {
        if (!this.formModel.isFieldValid()) return
        this.formModel.commentsTbl = this.formModel.formGroup.getRawValue()
        if (this.formModel.formAction === FormAction.Add) {
            this.formModel.commentsTbl.comment_id = uuid4()
        }
        this.execute(
            this.home.addComments(this.formModel.commentsTbl), {completedMessage: 'Comment added.'}
        )
    }

    override processCompleted(message?:string) {
        super.processCompleted(message)
        this.router.navigate([ClientPath.home, ClientPath.comments]).finally()
    }

    cancelClick() {
        this.router.navigate([ClientPath.home, ClientPath.comments]).finally()
        // this.router.navigate([ClientPath.one_level_back], {relativeTo: this.activatedRoute}).finally()
    }

}
