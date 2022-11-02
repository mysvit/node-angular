import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { SharedModule } from '@shared/shared.module'
import { CommentFormComponent } from './comment-form/comment-form.component'
import { CommentsRoutingModule } from './comments-routing.module'
import { CommentsComponent } from './comments/comments.component'
import { CommentsService } from './comments/comments.service'

@NgModule({
    declarations: [
        CommentsComponent,
        CommentFormComponent
    ],
    imports: [
        CommentsRoutingModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule
    ],
    providers: [
        CommentsService
    ]
})
export class CommentsModule {
}
