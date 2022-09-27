import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component'
import { AuthGuard } from '@core/services/auth.guard'
import { ClientPath } from '@shared-lib/constants'
import { StringHelper } from '@shared-lib/helpers'

const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        pathMatch: 'full'
    },
    {
        path: StringHelper.removeSlash(ClientPath.sign_in),
        loadChildren: () => import('./modules/user/user-sign-in/user-sign-in.module').then(m => m.UserSignInModule)
    },
    {
        path: StringHelper.removeSlash(ClientPath.signup),
        loadChildren: () => import('./modules/user/user-signup/user-signup.module').then(m => m.UserSignupModule)
    },
    {
        path: StringHelper.removeSlash(ClientPath.user_profile),
        canLoad: [AuthGuard],
        loadChildren: () => import('./modules/user/user-profile/user-profile.module').then(m => m.UserProfileModule)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**', component: NotFoundPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
