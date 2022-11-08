import { PictureModel, PicturesTbl } from '@dto'
import { randomUUID } from 'crypto'
import { FileHelper } from '../../helpers'

export namespace PicturesDtoHelper {

    export function PicturesTblFromModel(model: PictureModel): PicturesTbl {
        return <PicturesTbl>{
            picture_id: model.pictureId || randomUUID(),
            name: model.name,
            ext: model.ext,
            height: model.height,
            width: model.width,
            content: FileHelper.base64ToBuffer(model.contentBase64)
        }
    }

}
