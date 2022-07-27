import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserLoginComponent } from './user-login.component'

const homeRoutes: Routes = [
    {
        path: '',
        component: UserLoginComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class UserLoginRoutingModule {
}