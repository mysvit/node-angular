import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientPath } from '@shared-lib/constants'
import { HomeComponent } from './home.component'

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: ClientPath.comments,
                loadChildren: () => import('../comments/comments.module').then(m => m.CommentsModule)
            },
            {
                path: '',
                redirectTo: ClientPath.comments,
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
