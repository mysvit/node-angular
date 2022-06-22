//TODO - remove isArray later
// Test section remove

// old array support
// moder Array.isArray()
export function isArray(arr){
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export function isArrayNew(arr){
  return Array.isArray(arr)
}
