import { PictureModel } from '@dto'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'
import { FileHelper, MathHelper } from '@shared-lib/helpers'
import { FileContent } from '@shared/models/file-content'

export namespace PictureHelper {

    export async function resizePicture(file: FileContent, width: number, height: number): Promise<PictureModel> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = file.content
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height

                const context = canvas.getContext('2d') || new CanvasRenderingContext2D()
                context.drawImage(img, 0, 0, width, height)
                const data = context.canvas.toDataURL('image/png')

                resolve(
                    <PictureModel>{
                        name: FileHelper.getFileName(file.name),
                        ext: 'png',
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

    export function createImageFromLetter(letter: string, height: number, width: number, colorDeg?: number) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') || new CanvasRenderingContext2D()
        canvas.width = width
        canvas.height = height

        colorDeg = colorDeg && MathHelper.getRandomInt(0, 360)

        // background
        context.fillStyle = getRandomColor(colorDeg, 90, MathHelper.getRandomInt(45, 85)) + '50'
        context.fillRect(0, 0, width, height)

        // color
        context.fillStyle = getRandomColor(colorDeg, 100, MathHelper.getRandomInt(25, 60))
        context.textBaseline = 'middle'
        context.textAlign = 'center'
        context.font = `bold ${height / 1.5}px Roboto`
        context.fillText(letter, (width / 2), (height / 1.7))

        return canvas.toDataURL()
    }

    // get random color and background base on HSL notation
    export function getRandomColor(
        deg: number = MathHelper.getRandomInt(0, 360),
        saturation: number = MathHelper.getRandomInt(0, 100),
        lightness: number = MathHelper.getRandomInt(0, 100)
    ) {
        // `hsl(${deg}deg, ${saturation}%, ${lightness}%)`
        return hslToHex(deg, saturation, lightness)
    }

    function hslToHex(h: number, s: number, l: number) {
        l /= 100
        const a = s * Math.min(l, 1 - l) / 100
        const f = (n: number) => {
            const k = (n + h / 30) % 12
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
            return Math.round(255 * color).toString(16).padStart(2, '0')   // convert to Hex and prefix "0" if needed
        }
        return `#${f(0)}${f(8)}${f(4)}`
    }

    export function getPictureUrl(id: string): string {
        return environment.apiEndPoint + ApiPath.picture_get.replace(ApiParams.id, id)
    }

}
