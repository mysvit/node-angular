import { PictureModel, PictureTbl } from '@dto'
import { randomUUID } from 'crypto'
import { FileHelper } from '../helpers'

export class PictureDto {

    public pictureTblFromModel(model: PictureModel): PictureTbl {
        return <PictureTbl>{
            picture_id: model.picture_id || randomUUID(),
            name: model.name,
            ext: model.ext,
            height: model.height,
            width: model.width,
            content: FileHelper.base64ToBuffer(model.contentBase64)
        }
    }

}
