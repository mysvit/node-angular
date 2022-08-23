import { PictureModel, PictureTbl } from '@dto'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class PictureCore extends Core {

    async add(pictureModel: PictureModel): Promise<boolean> {
        const pictureTbl = new PictureTbl(pictureModel)
        pictureTbl.picture_id = randomUUID()
        const index = pictureModel.contentBase64.indexOf('base64,')
        pictureTbl.content = Buffer.from(pictureModel.contentBase64.substring(index + 7), 'base64')
        return this.pictureDb.insert(pictureTbl)
    }

    async update(pictureTbl: PictureTbl): Promise<boolean> {
        pictureTbl = new PictureTbl(pictureTbl)
        return this.pictureDb.update(pictureTbl)
    }

    async get(picture_id: string): Promise<PictureTbl> {
        ParamValidation.validateId(picture_id)
        return this.pictureDb.select(picture_id)
    }
}
