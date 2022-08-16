import { FileHelper } from '@shared-lib/helpers'
import { FileContent } from '@static/models/file-content'
import { PictureContent } from '@static/models/picture-content'

export namespace PictureHelper {

    export function resizePicture(file: FileContent, width: number, height: number): Promise<PictureContent> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = file.content
            img.onload = () => {
                console.debug('size', img.width, img.height)
                const elem = document.createElement('canvas')
                elem.width = width
                elem.height = height
                const ctx = elem.getContext('2d')
                ctx?.drawImage(img, 0, 0, width, height)
                const data = ctx?.canvas.toDataURL('image/png') || ''
                resolve(
                    <PictureContent>{
                        name: FileHelper.getFileName(file.name),
                        ext: FileHelper.getFileExt(file.name),
                        size: file.size,
                        height: height,
                        width: width,
                        content: data
                    }
                )
            }
            img.onerror = error => reject(error)
        })
    }

}
