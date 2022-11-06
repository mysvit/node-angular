import { Pipe, PipeTransform } from '@angular/core'
import { DateHelper } from '@shared-lib/helpers'

@Pipe({
    name: 'slDateTimeYyyyMmDdHhMmSsPipe'
})
export class DateTimeYyyyMmDdHhMmSsPipe implements PipeTransform {

    transform(value: string): string {
        return value ? DateHelper.formatDate(value, 'YYYY-MM-DD HH:mm:ss') : ''
    }

}
