import { PictureModel, PictureTbl } from '@dto'
import { randomUUID } from 'crypto'
import { FileHelper } from '../helpers'

export namespace PicturesDtoHelper {

    export function pictureTblFromModel(model: PictureModel): PictureTbl {
        return <PictureTbl>{
            picture_id: model.pictureId || randomUUID(),
            name: model.name,
            ext: model.ext,
            height: model.height,
            width: model.width,
            content: FileHelper.base64ToBuffer(model.contentBase64)
        }
    }

}
