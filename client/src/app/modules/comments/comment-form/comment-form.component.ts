import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core'
import { CommentSet } from '@dto'
import { SlStorage } from '@shared/storage'
import { FieldValidators } from '@shared/validators'
import { CommentFormModel } from './comment.form-model'

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, AfterViewInit {

    SlStorage = SlStorage
    FieldValidators = FieldValidators
    formModel = new CommentFormModel()
    isDisabled: boolean = false

    @ViewChild('commentText') private commentText?: ElementRef

    @Input() inModel: CommentSet = <CommentSet>{}

    @Input() set disabled(value: boolean) {
        this.disableForm(value)
    }

    get disabled() {
        return this.isDisabled
    }


    @Output() onSave: EventEmitter<CommentFormModel> = new EventEmitter<CommentFormModel>()
    @Output() onCancel = new EventEmitter()

    constructor(private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.formModel.formGroup.patchValue(this.inModel)
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
        this.onSave.emit(this.formModel)
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

}
