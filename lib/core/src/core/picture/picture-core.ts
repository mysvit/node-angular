import { PictureTbl } from '@dto'
import { randomUUID } from 'crypto'
import { Core } from '../core'

export class PictureCore extends Core {

    async add(pictureTbl: PictureTbl): Promise<boolean> {
        pictureTbl = new PictureTbl(pictureTbl)
        pictureTbl.picture_id = randomUUID()
        return this.pictureDb.insert(pictureTbl)
    }

    async update(pictureTbl: PictureTbl): Promise<boolean> {
        pictureTbl = new PictureTbl(pictureTbl)
        return this.pictureDb.update(pictureTbl)
    }

}
