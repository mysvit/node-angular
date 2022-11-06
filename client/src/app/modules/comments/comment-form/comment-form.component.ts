import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core'
import { CommentModel } from '@dto'
import { FormAction } from '@shared/enum'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { CommentFormModel } from './comment.form-model'

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, AfterViewInit {

    @Input() set formAction(value: FormAction) {
        this.saveButtonLabel = this.getButtonLabel(value)
    }

    @Input() smallIcon?: boolean
    @Input() model: CommentModel = <CommentModel>{}

    @Input() set disabled(value: boolean) {
        this.disableForm(value)
    }

    get disabled() {
        return this.isDisabled
    }

    @Output() onSave: EventEmitter<CommentModel> = new EventEmitter<CommentModel>()
    @Output() onCancel = new EventEmitter()

    @ViewChild('commentText') private commentText?: ElementRef

    SlStorage = SlStorage
    FieldValidators = FieldValidators
    formModel = new CommentFormModel()
    isDisabled: boolean = false
    saveButtonLabel?: string

    constructor(private renderer: Renderer2) {

    }

    ngOnInit(): void {
        this.formModel.formGroup.patchValue(this.model)
    }

    ngAfterViewInit() {
        this.renderer.setAttribute(this.commentText?.nativeElement, 'contenteditable', 'true')
        this.renderer.setAttribute(this.commentText?.nativeElement, 'placeholder', 'Add a comment...')
        this.commentText?.nativeElement.focus()
    }

    saveClick() {
        this.disableForm(true)
        if (!this.formModel.isFieldValid()) {
            this.disableForm(false)
            return
        }
        this.onSave.emit(<CommentModel>this.formModel.formGroup.getRawValue())
    }

    cancelClick() {
        this.onCancel.emit()
    }

    changeComment(event: any) {
        this.formModel.comment.patchValue(event?.target?.innerHTML)
    }

    private disableForm(isDisable: boolean) {
        this.isDisabled = isDisable
        if (this.commentText?.nativeElement) {
            this.renderer.setAttribute(this.commentText?.nativeElement, 'contenteditable', String(!isDisable))
        }
    }

    private getButtonLabel(value: FormAction) {
        switch (value) {
            case FormAction.Add:
                return 'Comment'
            case FormAction.Reply:
                return 'Reply'
        }
        return 'Save'
    }

}
