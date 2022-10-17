import { PictureModel, PictureTbl } from '@dto'
import { randomUUID } from 'crypto'
import { FileHelper } from '../helpers'

//TODO move to dto
export class PictureDto {

    public pictureTblFromModel(model: PictureModel): PictureTbl {
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
