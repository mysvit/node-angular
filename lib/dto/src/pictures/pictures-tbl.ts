import { Buffer } from 'buffer'

export interface PicturesTbl {
    picture_id: string
    name: string
    ext: string
    height: number
    width: number
    content: Buffer
}
