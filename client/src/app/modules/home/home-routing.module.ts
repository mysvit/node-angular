import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@core/services/auth.guard'
import { ClientPath, Props } from '@shared-lib/constants'
import { HomeCommentsFormComponent } from './home-comments-form/home-comments-form.component'
import { HomeCommentsComponent } from './home-comments/home-comments.component'
import { HomeComponent } from './home.component'

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: ClientPath.comments,
                component: HomeCommentsComponent
            },
            {
                path: ClientPath.comments + ClientPath.slash + ClientPath.colon + Props.action + ClientPath.slash + ClientPath.colon + Props.id,
                component: HomeCommentsFormComponent,
                canActivate: [AuthGuard]
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
