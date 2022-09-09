import { PictureModel, PictureTbl } from '@dto'
import { PictureDto } from '@shared'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class PictureCore extends Core {

    public pictureDto = new PictureDto()

    async add(pictureModel: PictureModel): Promise<number> {
        const pictureTbl = this.pictureDto.pictureTblFromModel(pictureModel)
        return this.pictureDb.insert(pictureTbl)
    }

    async get(pictureId: string): Promise<PictureTbl> {
        ParamValidation.validateUuId(pictureId)
        return this.pictureDb.select(
            <PictureTbl>{content: undefined},
            <PictureTbl>{picture_id: pictureId}
        )
    }

    async upd(pictureModel: PictureModel): Promise<number> {
        const pictureTbl = this.pictureDto.pictureTblFromModel(pictureModel)
        return this.pictureDb.update(
            pictureTbl,
            <PictureTbl>{picture_id: pictureTbl.picture_id}
        )
    }

    async del(pictureId: string): Promise<number> {
        ParamValidation.validateUuId(pictureId)
        return this.pictureDb.delete({picture_id: pictureId})
    }

}
