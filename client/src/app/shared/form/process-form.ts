import { Injector } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'
import { MessageType, ProcessStates } from '@shared/enum'
import { ProcessOption } from '@shared/form/process-option'
import { Observable, Subject, takeUntil } from 'rxjs'

export class ProcessForm {

    ProcessStates = ProcessStates
    cancel$: Subject<boolean> = new Subject<boolean>()
    processState: ProcessStates = ProcessStates.INITIAL

    public snackBar?: SnackBarService

    constructor(injector: Injector) {
        this.snackBar = injector.get<SnackBarService>(SnackBarService)
    }

    get disableForm() {
        return this.processState === ProcessStates.EXECUTING
    }

    get completedForm() {
        return this.processState === ProcessStates.COMPLETED
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
        this.processState = ProcessStates.EXECUTING
    }

    protected processCompleted(message?: any) {
        this.processState = ProcessStates.COMPLETED
        if (message) this.snackBar?.show(message, MessageType.Success, 4000)
    }

    protected processError(message?: any) {
        this.processState = ProcessStates.ERROR
        if (message) this.snackBar?.show(message, MessageType.Error, 6000)
    }

    protected resetMessages() {
        this.snackBar?.dismiss()
    }

}
