import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { DisableFormComponent } from '@core/components/form/disable-form'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { CompletedPageComponent } from './pages/completed-page/completed-page.component'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'

const components = [
    ToolbarComponent,
    DisableFormComponent
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
        MatToolbarModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class CoreModule {
}
