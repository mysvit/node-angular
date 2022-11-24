import { Directive, ViewContainerRef } from '@angular/core'
import { SnackBarService } from './snack-bar.service'

@Directive({
    standalone: true,
    selector: '[appSnackBar]'
})
export class SnackBarDirective {

    constructor(
        private viewContainer: ViewContainerRef,
        private snackBar: SnackBarService
    ) {
        snackBar.snackBarRef = viewContainer
    }

}
