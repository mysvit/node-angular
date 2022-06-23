import { errorApi500 } from '../routes/errors/error-api.js'

export function getValidId(uuid) {
    // if array - convert to string
    if (Array.isArray(uuid)) {
        uuid = uuid.join('')
    }
    // check if this is uuid
    if (!uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        throw new errorApi500(`ID has invalid uuid format ${uuid}`)
    }
    return uuid
}