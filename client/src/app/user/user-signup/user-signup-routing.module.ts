import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserSignupCompleteComponent } from './user-signup-complete/user-signup-complete.component'
import { UserSignupComponent } from './user-signup.component'

const routes: Routes = [
    {
        path: '',
        component: UserSignupComponent
    },
    {
        path: 'completed',
        component: UserSignupCompleteComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserSignupRoutingModule {
}
