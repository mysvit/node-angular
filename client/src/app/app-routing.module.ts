import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component'
import { AuthGuard } from '@core/services/auth.guard'
import { ClientPath } from '@shared-lib/constants'

const appRoutes: Routes = [
    {
        path: ClientPath.home,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: ClientPath.sign_in,
        loadChildren: () => import('./modules/user/user-sign-in/user-sign-in.module').then(m => m.UserSignInModule)
    },
    {
        path: ClientPath.signup,
        loadChildren: () => import('./modules/user/user-signup/user-signup.module').then(m => m.UserSignupModule)
    },
    {
        path: ClientPath.user_profile,
        canLoad: [AuthGuard],
        loadChildren: () => import('./modules/user/user-profile/user-profile.module').then(m => m.UserProfileModule)
    },
    {
        path: '',
        redirectTo: ClientPath.slash + ClientPath.home,
        pathMatch: 'full'
    },
    {
        path: '**', component: NotFoundPageComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false} // enable debug tracing
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
