import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { DisableFormComponent } from '@core/components/form/disable-form'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'

const components = [
    ToolbarComponent,
    NotFoundPageComponent,
    DisableFormComponent
]

@NgModule({
    declarations: [
        components
    ],
    exports: [
        components
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
