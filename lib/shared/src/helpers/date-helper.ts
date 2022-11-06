import { StringHelper } from './string-helper'

export namespace DateHelper {

    export function addDays(date: Date, days: number) {
        const result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
    }

    export function addHours(date: Date, hours: number) {
        const result = new Date(date)
        result.setHours(result.getHours() + hours)
        return result
    }

    export function addMinutes(date: Date, minutes: number) {
        const result = new Date(date)
        result.setMinutes(result.getMinutes() + minutes)
        return result
    }

    export function formatDate(date: string | Date, format: string) {
        const d = new Date(date)
        format = format.replace('YYYY', StringHelper.addZero(d.getFullYear().toString(10), 4))
        format = format.replace('MM', StringHelper.addZero(d.getMonth().toString(10), 2))
        format = format.replace('DD', StringHelper.addZero(d.getDate().toString(10), 2))
        format = format.replace('HH', StringHelper.addZero(d.getHours().toString(10), 2))
        format = format.replace('mm', StringHelper.addZero(d.getMinutes().toString(10), 2))
        format = format.replace('ss', StringHelper.addZero(d.getSeconds().toString(10), 2))
        return format
    }

}
