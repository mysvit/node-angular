import { Renderer2 } from '@angular/core'
import { FileContent } from '@static/models/file-content'

export namespace UploadHelper {

    export function uploadFileClick(renderer: Renderer2): Promise<FileList> {
        return new Promise((resolve, reject) => {
            try {
                const fileSelector = renderer.createElement('input')
                renderer.setProperty(fileSelector, 'type', 'file')
                renderer.listen(fileSelector, 'change', (file) => resolve(file.target.files))
                renderer.setProperty(fileSelector, 'type', 'file')
                fileSelector.click()
            } catch (error) {
                reject(error)
            }
        })
    }

    export function uploadFileReader(file: File): Promise<FileContent> {
        return new Promise(function (resolve, reject) {
                const reader = new FileReader()
                reader.onload = (event) => {
                    resolve(
                        <FileContent>{
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            lastModified: file.lastModified,
                            content: <string>event.target?.result
                        }
                    )
                }
                reader.onerror = (event) => reject(event.target?.error)
                reader.readAsDataURL(file)
            }
        )
    }

}
