import { PicturesDb } from '@db'
import { PictureModel, PicturesTbl } from '@dto'
import { PicturesDtoHelper } from '@shared'
import { ParamValidation } from '../../validation'
import { Core } from '../core'

export class PicturesCore extends Core {

    private picturesDb = new PicturesDb(this.pool)

    async add(pictureModel: PictureModel): Promise<number> {
        const picturesTbl = PicturesDtoHelper.PicturesTblFromModel(pictureModel)
        return this.picturesDb.insert(picturesTbl)
    }

    async get(pictureId: string): Promise<PicturesTbl> {
        ParamValidation.validateUuId(pictureId)
        return this.picturesDb.select(
            <PicturesTbl>{content: undefined},
            <PicturesTbl>{picture_id: pictureId}
        )
    }

    async upd(pictureModel: PictureModel): Promise<number> {
        const picturesTbl = PicturesDtoHelper.PicturesTblFromModel(pictureModel)
        return this.picturesDb.update(
            picturesTbl,
            <PicturesTbl>{picture_id: picturesTbl.picture_id}
        )
    }

    async del(pictureId: string): Promise<number> {
        ParamValidation.validateUuId(pictureId)
        return this.picturesDb.delete({picture_id: pictureId})
    }

}
