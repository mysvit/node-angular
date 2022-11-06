import { DialogAction } from '@shared/enum/dialog-action'

export interface DialogModel {
    action: DialogAction
    title: string
    content: string
}
