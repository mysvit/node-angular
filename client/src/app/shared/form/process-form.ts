import { Injector } from '@angular/core'
import { Router } from '@angular/router'
import { SnackBarService } from '@core/services/snack-bar.service'
import { ClientPath } from '@shared-lib/constants'
import { MessageType, ProcessState } from '@shared/enum'
import { ProcessOption } from '@shared/form/process-option'
import { SlStorage } from '@shared/storage'
import { Observable, Subject, takeUntil } from 'rxjs'

export class ProcessForm {

    ProcessStates = ProcessState
    cancel$: Subject<boolean> = new Subject<boolean>()
    processState: ProcessState = ProcessState.Initial

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
                complete: () => this.processCompleted(option?.completedMessage),
                error: (error) => this.processError(error)
            })
    }

    protected cancelProcess() {
        this.cancel$.next(true)
    }

    protected processExecuting() {
        this.processState = ProcessState.Executing
    }

    protected processCompleted(message?: any) {
        this.processState = ProcessState.Completed
        if (message) this.snackBar?.show(message, MessageType.Success, 4000)
    }

    protected processError(message?: any) {
        this.processState = ProcessState.Error
        if (message) this.snackBar?.show(message, MessageType.Error)
    }

    protected resetMessages() {
        this.snackBar?.dismiss()
    }

}
