export function isEmpty(value): boolean {
  if (value === undefined || value === null || value === '') {
    return true
  }
  if (value.hasOwnProperty('length') && value.length === 0) {
    return true
  }
  if (value && Object.keys(value).length === 0 && {}.toString.call(value) === '[object Object]') {
    return true
  }
  return false
}
