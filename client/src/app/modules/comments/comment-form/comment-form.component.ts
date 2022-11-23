import { AfterViewInit, Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core'
import { CommentModel } from '@dto'
import { FormAction } from '@shared/enum'
import { ProcessForm } from '@shared/form'
import { ErrorClient } from '@shared/models/error-client'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { CommentsService } from '../comments/comments.service'
import { CommentFormModel } from './comment.form-model'

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent extends ProcessForm implements OnInit, AfterViewInit {

    @Input() formAction!: FormAction
    @Input() model: CommentModel = <CommentModel>{}
    @Input() smallIcon?: boolean

    @Output() close: EventEmitter<CommentModel> = new EventEmitter<CommentModel>()

    @ViewChild('commentTextRef') private commentTextRef?: ElementRef

    isButtonDisabled: boolean = false

    SlStorage = SlStorage
    FieldValidators = FieldValidators
    formModel = new CommentFormModel()
    saveButtonLabel?: string

    constructor(
        private injector: Injector,
        private renderer: Renderer2,
        private comments: CommentsService
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.setButtonLabel()
        this.formModel.formGroup.patchValue(this.model)
    }

    ngAfterViewInit() {
        this.renderer.setAttribute(this.commentTextRef?.nativeElement, 'contenteditable', 'true')
        this.renderer.setAttribute(this.commentTextRef?.nativeElement, 'placeholder', 'Add a comment...')
        this.commentTextRef?.nativeElement.focus()
    }

    handleCommentTextChange(event: any) {
        this.formModel.comment.patchValue(event?.target?.innerHTML)
    }

    handleSaveClick() {
        this.disableForm(true)
        if (!this.formModel.isFieldValid()) {
            this.disableForm(false)
            return
        }
        this.saveComment()
    }

    handleCancelClick() {
        this.close.emit()
    }

    private disableForm(isDisable: boolean) {
        this.isButtonDisabled = isDisable
        if (this.commentTextRef?.nativeElement) {
            this.renderer.setAttribute(this.commentTextRef?.nativeElement, 'contenteditable', String(!isDisable))
        }
    }

    private setButtonLabel() {
        switch (this.formAction) {
            case FormAction.Add:
                this.saveButtonLabel = 'Comment'
                break
            case FormAction.Reply:
                this.saveButtonLabel = 'Reply'
                break
            default:
                this.saveButtonLabel = 'Save'
        }
    }

    private saveComment() {
        this.model = <CommentModel>this.formModel.formGroup.getRawValue()
        switch (this.formAction) {
            case FormAction.Add:
            case FormAction.Reply:
                this.execute(
                    this.comments.commentAddApi(this.model),
                    {completedMessage: 'Your comment added to the end' + (this.formAction === FormAction.Reply ? ' of replies.' : '.')}
                )
                break
            case FormAction.Upd:
                this.execute(this.comments.commentUpdApi(this.model))
                break
        }
    }

    override processError(error: ErrorClient) {
        this.disableForm(false)
        super.processError(error)
    }

    override processCompleted(message?: any) {
        super.processCompleted(message, 0)
        this.close.emit(this.model)
    }

}
