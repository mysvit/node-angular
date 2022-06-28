export function isEmpty(value): boolean {
    // == Null or undefined value
    if (value == null || value === '') {
        return true
    }
    // Empty array
    if (Array.isArray(value) && value.length === 0) {
        return true
    }
    // Empty object
    return (Object.prototype.toString.call(value) === '[object Object]' && Object.keys(value).length === 0)
}