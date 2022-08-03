import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { WarnMessageComponent } from './components/warn-message/warn-message.component'
import { CompletedPageComponent } from './pages/completed-page/completed-page.component'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'

const components = [
    ToolbarComponent,
    WarnMessageComponent
]

const pages = [
    NotFoundPageComponent,
    CompletedPageComponent
]

@NgModule({
    declarations: [
        components,
        pages

    ],
    exports: [
        components,
        pages
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule
    ]
})
export class CoreModule {
}
