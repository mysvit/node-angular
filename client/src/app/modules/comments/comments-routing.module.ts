import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommentsRootComponent } from './comments-root/comments-root.component'

const routes: Routes = [
    {
        path: '',
        component: CommentsRootComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommentsRoutingModule {
}
