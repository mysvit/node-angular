import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { SharedModule } from '@shared/shared.module'
import { HomeCommentsFormComponent } from './home-comments-form/home-comments-form.component'
import { HomeCommentsComponent } from './home-comments/home-comments.component'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

@NgModule({
    declarations: [
        HomeComponent,
        HomeCommentsComponent,
        HomeCommentsFormComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        SharedModule,
        MatIconModule
    ]
})
export class HomeModule {
}
