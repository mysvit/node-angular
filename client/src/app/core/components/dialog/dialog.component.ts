import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DialogModel } from '@core/components/dialog/dialog-model'
import { TrButton } from '@shared-lib/translation'
import { DialogAction } from '@shared/enum/dialog-action'

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    okButtonLabel?: string

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogModel
    ) {
        this.setButtonLabel()
    }

    okClick() {
        this.dialogRef.close(true)
    }

    cancelClick() {
        this.dialogRef.close(false)
    }

    setButtonLabel() {
        switch (this.data.action) {
            case DialogAction.Delete:
                this.okButtonLabel = TrButton.Delete
        }
        this.okButtonLabel = TrButton.Ok
    }

}
