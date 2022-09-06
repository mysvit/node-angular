import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { StatesService } from '@core/services/states.service'
import { AuthModel, AuthType, ForgotPassModel, LoginModel, ResetPassModel, VerifyCodeModel } from '@dto'
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
                    SlStorage.user_id = data.userId
                    SlStorage.email = data.email
                    switch (data.authType) {
                        case AuthType.Authenticated:
                            this.userAuthenticated(data).finally()
                            break
                        case AuthType.NeedVerification:
                            this.router.navigate([StringHelper.removeSlash(ClientPath.verify)], {relativeTo: activatedRoute}).finally()
                            break
                    }
                })
            )

    }

    verifyCode(userId: string, verificationCode: string): Observable<void> {
        return this.http.put<AuthModel>(environment.apiEndPoint + ApiPath.user_verify_code.replace(':user_id', userId),
            <VerifyCodeModel>{verificationCode: verificationCode})
            .pipe(
                map((data: AuthModel) => {
                    switch (data.authType) {
                        case AuthType.Authenticated:
                            this.userAuthenticated(data).finally(() =>
                                this.snackBar.show('Verification ok. You logged in to your account.', MessageType.Success, 5000)
                            )
                            break
                        case AuthType.VerifiedButNotAuth:
                            this.router.navigate([ClientPath.login]).finally(() =>
                                this.snackBar.show('Verification ok. Login to your account.', MessageType.Success, 5000)
                            )
                            break
                    }
                })
            )
    }

    resendCode(userId: string): Observable<number> {
        return this.http.put<number>(environment.apiEndPoint + ApiPath.user_resend_code.replace(ApiParams._user_id, userId), {})
    }

    forgotPass(email: string): Observable<number> {
        return this.http.post<number>(environment.apiEndPoint + ApiPath.user_forgot_pass,
            <ForgotPassModel>{
                email: email
            }
        )
    }

    resetPass(resetPassModel: ResetPassModel): Observable<number> {
        return this.http.post<number>(environment.apiEndPoint + ApiPath.user_reset_pass, resetPassModel)
    }

    private userAuthenticated(data: AuthModel): Promise<boolean> {
        SlStorage.is_auth = '1'
        SlStorage.token = `Bearer ${data.token}`
        SlStorage.email = data.email
        SlStorage.nickname = data.nickname
        SlStorage.avatar_id = data.avatarId
        this.states.isAuth().next(true)
        return this.router.navigate([this.states.redirectUrl ?? ClientPath.one_level_back])
    }

}
