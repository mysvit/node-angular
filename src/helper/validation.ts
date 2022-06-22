import { Api500Error } from '../routes/errors/api-error.js'

export function getValidId(uuid) {
    // if array - convert to string
    if (Array.isArray(uuid)) {
        uuid = uuid.join('')
    }
    // check if this is uuid
    if (!uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        throw new Api500Error(`User with id: ${uuid} not found.`)
    }
    return uuid
}