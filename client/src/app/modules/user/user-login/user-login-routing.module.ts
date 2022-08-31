import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserIdGuard } from '@core/services/user-id.guard'
import { ClientPath } from '@shared-lib/constants'
import { StringHelper } from '@shared-lib/helpers'
import { UserLoginComponent } from './user-login.component'
import { UserVerificationComponent } from './user-verification/user-verification.component'

const routes: Routes = [
    {
        path: '',
        component: UserLoginComponent
    },
    {
        path: StringHelper.removeSlash(ClientPath.verify),
        canActivate: [UserIdGuard],
        component: UserVerificationComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserLoginRoutingModule {
}
