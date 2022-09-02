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

    async read(pictureId: string): Promise<PictureTbl> {
        ParamValidation.validateUuId(pictureId)
        return this.pictureDb.select(
            <PictureTbl>{content: undefined},
            <PictureTbl>{picture_id: pictureId}
        )
    }

    async update(pictureModel: PictureModel): Promise<number> {
        const pictureTbl = this.pictureDto.pictureTblFromModel(pictureModel)
        return this.pictureDb.update(
            pictureTbl,
            <PictureTbl>{picture_id: pictureTbl.picture_id}
        )
    }

    async delete(pictureId: string): Promise<number> {
        ParamValidation.validateUuId(pictureId)
        return this.pictureDb.delete(pictureId)
    }

}
