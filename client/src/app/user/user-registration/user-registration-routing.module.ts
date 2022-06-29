import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserRegistrationComponent } from './user-registration.component'

const homeRoutes: Routes = [
    {
        path: '',
        component: UserRegistrationComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class UserRegistrationRoutingModule {
}