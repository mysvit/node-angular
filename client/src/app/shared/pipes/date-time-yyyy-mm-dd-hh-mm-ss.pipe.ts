import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
    name: 'slDateTimeYyyyMmDdHhMmSsPipe'
})
export class DateTimeYyyyMmDdHhMmSsPipe implements PipeTransform {

    transform(value: string): string {
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''
    }

}
