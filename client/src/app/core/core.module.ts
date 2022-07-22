import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component'


@NgModule({
    declarations: [
        NotFoundPageComponent,
        ToolbarComponent
    ],
    exports: [
        ToolbarComponent
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