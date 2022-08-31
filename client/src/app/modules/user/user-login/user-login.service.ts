import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { AuthModel, AuthType, LoginModel, VerifyModel } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath, ClientPath } from '@shared-lib/constants'
import { StringHelper } from '@shared-lib/helpers'
import { MessageType } from '@shared/enum'
import { SlStorage } from '@shared/storage'
import { map, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private states: StatesService,
        private snackBar: SnackBarService
    ) {
    }

    login(model: LoginModel, activatedRoute: ActivatedRoute): Observable<void> {
        return this.http.post<AuthModel>(environment.apiEndPoint + ApiPath.user_login, model)
            .pipe(
                map((data: AuthModel) => {
                    SlStorage.user_id = data.user_id
                    SlStorage.email = data.email
                    switch (data.authType) {
                        case AuthType.Authenticated:
                            this.userAuthenticated(data)
                            break
                        case AuthType.NeedVerification:
                            this.router.navigate([StringHelper.removeSlash(ClientPath.verify)], {relativeTo: activatedRoute}).finally()
                            break
                    }
                })
            )

    }

    verify(user_id: string, verification_code: string): Observable<void> {
        return this.http.put<AuthModel>(environment.apiEndPoint + ApiPath.user_verify.replace(':user_id', user_id),
            <VerifyModel>{verification_code: verification_code})
            .pipe(
                map((data: AuthModel) => {
                    switch (data.authType) {
                        case AuthType.Authenticated:
                            this.userAuthenticated(data)
                            this.snackBar.show('Verification ok. You logged in to your account.', MessageType.Success, 3000)
                            break
                        case AuthType.VerifiedButNotAuth:
                            this.router.navigate([ClientPath.login]).finally(() =>
                                this.snackBar.show('Verification ok. Login to your account.', MessageType.Success, 3000)
                            )
                            break
                    }
                })
            )
    }

    resend(user_id: string): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.user_resend.replace(ApiParams._user_id, user_id), {})
    }

    private userAuthenticated(data: AuthModel) {
        SlStorage.is_auth = '1'
        SlStorage.token = `Bearer ${data.token}`
        SlStorage.email = data.email
        SlStorage.nickname = data.nickname
        SlStorage.avatar_id = data.avatar_id
        this.states.isAuth().next(true)
        this.router.navigate([this.states.redirectUrl ?? ClientPath.one_level_back]).finally()
    }

}
