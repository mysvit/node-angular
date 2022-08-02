import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CompletedPageComponent } from '@core/pages/completed-page/completed-page.component'
import { UserSignupComponent } from './user-signup.component'

const routes: Routes = [
    {
        path: '',
        component: UserSignupComponent
    },
    {
        path: 'completed',
        component: CompletedPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserSignupRoutingModule {
}
