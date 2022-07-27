import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserSignupComponent } from './user-signup.component'

const homeRoutes: Routes = [
    {
        path: '',
        component: UserSignupComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class UserSignupRoutingModule {
}