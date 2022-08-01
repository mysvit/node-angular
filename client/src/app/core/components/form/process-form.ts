import { ProcessStates } from '@core/enum/process-states'
import { Observable, Subject, takeUntil } from 'rxjs'

export class ProcessForm {

    cancel$: Subject<boolean> = new Subject<boolean>()
    processState: ProcessStates = ProcessStates.INITIAL
    executingMessage: string = ''
    completedMessage: string = ''
    errorMessage: string = ''

    get disableForm() {
        return this.processState === ProcessStates.EXECUTING
    }

    protected execute(observable: Observable<Object>, singleProcess = true): void {
        this.resetMessages()
        this.processExecuting()
        if (singleProcess) {
            this.cancelProcess()
        }
        observable
            .pipe(
                takeUntil(this.cancel$)
            )
            .subscribe({
                complete: () => this.processCompleted(),
                error: (error) => this.processError(error)
            })
    }

    protected cancelProcess() {
        this.cancel$.next(true)
    }

    protected processExecuting(message?: string) {
        this.processState = ProcessStates.EXECUTING
        this.executingMessage = message || ''
    }

    protected processCompleted(message?: string) {
        this.processState = ProcessStates.COMPLETED
        this.completedMessage = message || ''
    }

    protected processError(error?: any) {
        console.error(error)
        this.processState = ProcessStates.ERROR
        this.errorMessage = error?.error?.message || ''
    }

    private resetMessages() {
        this.executingMessage = ''
        this.completedMessage = ''
        this.errorMessage = ''
    }

}
