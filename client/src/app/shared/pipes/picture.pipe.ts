import { Pipe, PipeTransform } from '@angular/core'
import { environment } from '@env'
import { ApiParams, ApiPath } from '@shared-lib/constants'

@Pipe({
    name: 'slPictureUrl'
})
export class PicturePipe implements PipeTransform {

    transform(value: string): string {
        return value ? environment.apiEndPoint + ApiPath.picture_get.replace(ApiParams._picture_id, value) : ''
    }

}
