import { Injector } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { MessageType, ProcessState } from '@shared/enum'
import { ProcessOption } from '@shared/form/process-option'
import { Observable, Subject, takeUntil } from 'rxjs'

export class ProcessForm {

    ProcessStates = ProcessState
    cancel$: Subject<boolean> = new Subject<boolean>()
    processState: ProcessState = ProcessState.Initial

    public snackBar?: SnackBarService

    constructor(injector: Injector) {
        this.snackBar = injector.get<SnackBarService>(SnackBarService)
    }

    get disableForm() {
        return this.processState === ProcessState.Executing
    }

    get completedForm() {
        return this.processState === ProcessState.Completed
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
