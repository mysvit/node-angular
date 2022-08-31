import { Buffer } from 'buffer'

export interface PictureTbl {
    picture_id: string
    name: string
    ext: string
    height: number
    width: number
    content: Buffer
}
