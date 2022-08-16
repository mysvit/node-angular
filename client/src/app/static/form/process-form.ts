import { ProcessStates } from '@static/enum'
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

    protected execute(observable: Observable<Object | void>, singleProcess = true): void {
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

    protected processError(errorEvent?: any) {
        console.error('processError', errorEvent)
        this.processState = ProcessStates.ERROR
        // this.errorMessage = error.name === 'HttpErrorResponse' ? 'Check internet connection.' : ''
        this.errorMessage = errorEvent?.error?.message || ''
    }

    private resetMessages() {
        this.executingMessage = ''
        this.completedMessage = ''
        this.errorMessage = ''
    }

}
