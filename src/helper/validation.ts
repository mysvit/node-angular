import { newHttpError } from '../routes/errors/errors.js'

export function getValidId(uuid) {
    if (!uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        return newHttpError(400, 'uuid bad format!')
    }
    return uuid
}