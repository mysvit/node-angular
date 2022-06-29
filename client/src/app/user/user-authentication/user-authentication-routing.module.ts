import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserAuthenticationComponent } from './user-authentication.component'

const homeRoutes: Routes = [
    {
        path: '',
        component: UserAuthenticationComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class UserAuthenticationRoutingModule {
}