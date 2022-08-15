export namespace ImageHelper {

    export function compressImage(src: any, newX: number, newY: number) {
        return new Promise((res, rej) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                console.debug('size', img.width, img.height)
                const elem = document.createElement('canvas')
                elem.width = newX
                elem.height = newY
                const ctx = elem.getContext('2d')
                ctx?.drawImage(img, 0, 0, newX, newY)
                const data = ctx?.canvas.toDataURL()
                res(data)
            }
            img.onerror = error => rej(error)
        })
    }

}
