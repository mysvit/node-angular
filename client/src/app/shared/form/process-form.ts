import { Injector } from '@angular/core'
import { Router } from '@angular/router'
import { ClientPath } from '@shared-lib/constants'
import { ErrorTypes, ProcessState } from '@shared/enum'
import { ProcessOption } from '@shared/form/process-option'
import { ErrorClient } from '@shared/models/error-client'
import { SlStorage } from '@shared/storage'
import { SnackBarService } from '@standalone/snack-bar/snack-bar.service'
import { SnackBarType } from '@standalone/snack-bar/snack-bar.type'
import { Observable, Subject, takeUntil } from 'rxjs'

export class ProcessForm {

    ProcessStates = ProcessState
    cancel$: Subject<boolean> = new Subject<boolean>()
    processState: ProcessState = ProcessState.Initial

    isShowSpinner: boolean = false
    snackBar?: SnackBarService
    router: Router

    private delayMultiExecution?: Date

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

    get showSpinner() {
        return this.isShowSpinner
    }

    protected execute(observable: Observable<Object | void>, option?: ProcessOption): void {
        // don't allow to execute process many times from many click
        if (this.delayMultiExecution == undefined || new Date().getTime() - this.delayMultiExecution.getTime() > 2000) {
            this.delayMultiExecution = new Date()
        } else {
            return
        }
        // cancel previous process if set option not multipleProcess
        if (!option?.multipleProcess) {
            this.cancelProcess()
        }
        this.resetMessages()
        this.processExecuting()
        this.setShowSpinner()
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
    }

    protected processCompleted(message?: any, duration = 4000) {
        this.processState = ProcessState.Completed
        this.setShowSpinner()
        this.delayMultiExecution = undefined
        if (message) this.snackBar?.show(message, SnackBarType.Success, duration)
    }

    protected processError(error: ErrorClient) {
        this.processState = ProcessState.Error
        if (error && error.errorType !== ErrorTypes.Interceptor) {
            this.snackBar?.show(error.message, SnackBarType.Error)
        }
    }

    protected resetMessages() {
        this.snackBar?.close()
    }

    private setShowSpinner() {
        setTimeout(() => {
            this.isShowSpinner = this.processState === ProcessState.Executing
        }, 500)
    }

}
