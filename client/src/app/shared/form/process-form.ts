import { Injector, ViewContainerRef } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { ClientPath } from '@shared-lib/constants'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { ErrorTypes, MessageType, ProcessState } from '@shared/enum'
import { ProcessOption } from '@shared/form/process-option'
import { ErrorClient } from '@shared/models/error-client'
import { SlStorage } from '@shared/storage'
import { Observable, Subject, takeUntil } from 'rxjs'

export class ProcessForm {

    ProcessStates = ProcessState
    cancel$: Subject<boolean> = new Subject<boolean>()
    processState: ProcessState = ProcessState.Initial

    spinnerRef?: ViewContainerRef
    public snackBar?: SnackBarService
    public router: Router

    constructor(injector: Injector) {
        this.snackBar = injector.get<SnackBarService>(SnackBarService)
        this.router = injector.get<Router>(Router)
    }

    get executingForm(): boolean {
        return this.processState === ProcessState.Executing
    }

    get completedForm(): boolean {
        return this.processState === ProcessState.Completed
    }

    get isAuth(): boolean {
        if (!SlStorage.isAuth) {
            this.router.navigate([ClientPath.sign_in]).finally()
        }
        return SlStorage.isAuth
    }

    protected execute(observable: Observable<Object | void>, option?: ProcessOption): void {
        this.resetMessages()
        this.processExecuting()
        if (option?.multipleProcess) {
            this.cancelProcess()
        }
        observable
            .pipe(
                takeUntil(this.cancel$)
            )
            .subscribe({
                error: (error) => this.processError(error),
                complete: () => this.processCompleted(option?.completedMessage)
            })
    }

    protected cancelProcess() {
        this.cancel$.next(true)
    }

    protected processExecuting() {
        this.processState = ProcessState.Executing
        this.spinnerShow()
    }

    protected processCompleted(message?: any) {
        this.processState = ProcessState.Completed
        if (message) this.snackBar?.show(message, MessageType.Success, 4000)
        this.spinnerHide()
    }

    protected processError(error: ErrorClient) {
        this.processState = ProcessState.Error
        if (error && error.errorType !== ErrorTypes.Interceptor) {
            this.snackBar?.show(error.message, MessageType.Error)
        }
        this.spinnerHide()
    }

    protected resetMessages() {
        this.snackBar?.dismiss()
    }

    spinnerShow(): void {
        if (this.spinnerRef) {
            this.spinnerRef?.clear()
            this.spinnerRef?.createComponent<SpinnerComponent>(SpinnerComponent, {})
        }
    }

    spinnerHide(): void {
        if (this.spinnerRef) this.spinnerRef?.clear()
    }

}
