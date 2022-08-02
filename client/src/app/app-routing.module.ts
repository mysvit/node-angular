import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component'

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/user/user-login/user-login.module').then(m => m.UserLoginModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./modules/user/user-signup/user-signup.module').then(m => m.UserSignupModule)
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
