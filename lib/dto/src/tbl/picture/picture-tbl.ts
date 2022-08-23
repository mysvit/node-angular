import { Buffer } from 'buffer'

export class PictureTbl {

    picture_id: string
    name: string
    ext: string
    size: number
    height: number
    width: number
    content: Buffer

    constructor(obj: any) {
        this.picture_id = obj?.picture_id
        this.name = obj?.name
        this.ext = obj?.ext
        this.size = obj?.size
        this.height = obj?.height
        this.width = obj?.width
        this.content = obj?.content
    }

    get addArr() {
        return [this.picture_id, this.name, this.ext, this.size, this.height, this.width, this.content]
    }

    get updateArr() {
        return [this.name, this.ext, this.size, this.height, this.width, this.content, this.picture_id]
    }

}
