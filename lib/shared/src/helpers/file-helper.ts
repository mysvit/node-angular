export namespace FileHelper {

    export function getFileName(fullName: string) {
        const regEx = /([^:\\\/]*?)(?:\.([^ :\\\/.]*))?$/
        const groups = regEx.exec(fullName)
        return groups[1]
    }

    export function getFileExt(fullName: string) {
        const regEx = /([^:\\\/]*?)(?:\.([^ :\\\/.]*))?$/
        const groups = regEx.exec(fullName)
        return groups[2] || ''
    }

    export function base64ToBuffer(context:string) {
        const index = context.indexOf('base64,')
        return Buffer.from(context.substring(index + 7), 'base64')
    }

}
