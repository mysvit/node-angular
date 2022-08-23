import { PictureModel } from '@dto'
import { FileHelper } from '@shared-lib/helpers'
import { FileContent } from '@shared/models/file-content'

export namespace PictureHelper {

    export async function resizePicture(file: FileContent, width: number, height: number): Promise<PictureModel> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = file.content
            img.onload = () => {
                const tmpCanvas = document.createElement('canvas')
                tmpCanvas.width = width
                tmpCanvas.height = height

                const ctx = tmpCanvas.getContext('2d') || new CanvasRenderingContext2D()
                ctx.drawImage(img, 0, 0, width, height)

                const data = ctx.canvas.toDataURL('image/png')

                resolve(
                    <PictureModel>{
                        name: FileHelper.getFileName(file.name),
                        ext: 'png',
                        size: file.size,
                        height: height,
                        width: width,
                        contentBase64: data
                    }
                )
            }
            img.onerror = error => {
                console.error(error)
                reject(new Error('Picture resize error'))
            }
        })
    }


}
