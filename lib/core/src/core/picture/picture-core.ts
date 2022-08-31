import { PictureModel, PictureTbl } from '@dto'
import { FileHelper } from '@shared'
import { randomUUID } from 'crypto'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class PictureCore extends Core {

    public static pictureTblFromModel(model: PictureModel): PictureTbl {
        return <PictureTbl>{
            picture_id: model.picture_id || randomUUID(),
            name: model.name,
            ext: model.ext,
            height: model.height,
            width: model.width,
            content: FileHelper.base64ToBuffer(model.contentBase64)
        }
    }


    async create(pictureModel: PictureModel): Promise<number> {
        const pictureTbl = PictureCore.pictureTblFromModel(pictureModel)
        return this.pictureDb.insert(pictureTbl)
    }

    async read(picture_id: string): Promise<PictureTbl> {
        ParamValidation.validateId(picture_id)
        return this.pictureDb.select(
            <PictureTbl>{content: undefined},
            <PictureTbl>{picture_id: picture_id}
        )
    }

    async update(pictureModel: PictureModel): Promise<number> {
        const pictureTbl = PictureCore.pictureTblFromModel(pictureModel)
        return this.pictureDb.update(
            pictureTbl,
            <PictureTbl>{picture_id: pictureTbl.picture_id}
        )
    }

    async delete(picture_id: string): Promise<number> {
        ParamValidation.validateId(picture_id)
        return this.pictureDb.delete(picture_id)
    }

}
