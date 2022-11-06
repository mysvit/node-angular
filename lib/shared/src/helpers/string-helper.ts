export namespace StringHelper {

    export function format(str, ...arg) {
        for (let i = 0; i < arg.length; i++) {
            const regexp = new RegExp('\\{' + i + '\\}', 'gi')
            str = str.replace(regexp, arg[i])
        }
        return str
    }

    export function removeSlash(value: string) {
        return value.replace('/', '')
    }

    export function addZero(value: string, length: number) {
        return value
            ? value.length < length
                ? '0' + value
                : value
            : value
    }

}
