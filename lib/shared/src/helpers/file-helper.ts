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

}
