import { Directive, ViewContainerRef } from '@angular/core'
import { SnackBarService } from '@core/services/snack-bar.service'

@Directive({selector: '[appSnackBar]'})
export class SnackBarDirective {

    constructor(
        private viewContainer: ViewContainerRef,
        private snackBar: SnackBarService
    ) {
        snackBar.snackBarRef = viewContainer
    }

}
