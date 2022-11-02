import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommentSet } from '@dto'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { CommentFormModel } from './comment.form-model'

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

    SlStorage = SlStorage
    FieldValidators = FieldValidators
    formModel = new CommentFormModel()

    @Input() model: CommentSet = <CommentSet>{}
    @Output() onSave: EventEmitter<CommentFormModel> = new EventEmitter<CommentFormModel>()
    @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>()

    constructor() {
        // this.snackBar?.dismiss()
        // this.activatedRoute.paramMap
        //     .pipe(
        //         map((params: ParamMap) => {
        //             this.formModel.formAction = <FormAction>(params.get(Props.action) || FormAction.View)
        //             if (this.formModel.formAction !== FormAction.Add && ValueHelper.isEmpty(params.get(Props.id))) {
        //                 this.execute(this.home.commentGet(params.get(Props.id) || ''))
        //             }
        //         })
        //     )
        //     .subscribe()
    }

    ngOnInit(): void {
        this.formModel.commentValue = this.model.comment
        this.formModel.formGroup.patchValue(this.model)
    }

    // onCommentChange() {
    //     console.log(this.formModel.comment.value)
    // }

    saveClick() {
        if (!this.formModel.isFieldValid()) return
        this.onSave.emit(this.formModel)
        // this.formModel.commentsTbl = this.formModel.formGroup.getRawValue()
        // if (this.formModel.formAction === FormAction.Add) {
        //     this.formModel.commentsTbl.comment_id = uuid4()
        // }
        // this.execute(
        //     this.home.commentAdd(this.formModel.commentsTbl), {completedMessage: 'Comment added.'}
        // )
    }

    // override processCompleted(message?: string) {
    //     super.processCompleted(message)
    // this.router.navigate([ClientPath.home, ClientPath.comments]).finally()
    // }

    cancelClick() {
        this.onCancel.emit(true)
        // this.router.navigate([ClientPath.home, ClientPath.comments]).finally()
        // this.router.navigate([ClientPath.one_level_back], {relativeTo: this.activatedRoute}).finally()
    }

    changeComment(event: any) {
        this.formModel.comment.patchValue(event?.target?.innerHTML)
    }

}
