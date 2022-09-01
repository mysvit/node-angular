import { PictureModel, PictureTbl } from '@dto'
import { PictureDto } from '@shared'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class PictureCore extends Core {

    public pictureDto = new PictureDto()

    async create(pictureModel: PictureModel): Promise<number> {
        const pictureTbl = this.pictureDto.pictureTblFromModel(pictureModel)
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
        const pictureTbl = this.pictureDto.pictureTblFromModel(pictureModel)
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
