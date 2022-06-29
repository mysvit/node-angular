import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component'

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        pathMatch: 'full'
    },
    {
        path: 'user-authentication',
        loadChildren: () => import('./user/user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
    },
    {
        path: 'user-registration',
        loadChildren: () => import('./user/user-registration/user-registration.module').then(m => m.UserRegistrationModule)
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