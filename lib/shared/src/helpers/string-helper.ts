export class StringHelper {

    static format(str, ...arg) {
        for (let i = 0; i < arg.length; i++) {
            const regexp = new RegExp('\\{' + i + '\\}', 'gi')
            str = str.replace(regexp, arg[i])
        }
        return str
    }

}