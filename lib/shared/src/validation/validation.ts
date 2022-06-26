export class Validation {

    // check if this is uuid
    static isValidUUID(uuid) {
        return !!uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    }

}
