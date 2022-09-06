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

}
