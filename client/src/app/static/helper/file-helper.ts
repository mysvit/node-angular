import { Renderer2 } from '@angular/core'

export namespace FileHelper {

    export function uploadFileClick(renderer: Renderer2) {
        return new Promise(function (resolve, reject) {
            const fileSelector = renderer.createElement('input')
            renderer.setProperty(fileSelector, 'type', 'file')
            renderer.listen(fileSelector, 'change', resolve)
            renderer.setProperty(fileSelector, 'type', 'file')
            fileSelector.click()
        })
    }

    export function fileReader(file: File) {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader()
            reader.onload = resolve
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

}
