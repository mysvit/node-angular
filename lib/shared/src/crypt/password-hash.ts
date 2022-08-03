import { SaltedHash } from '@dto'
import { pbkdf2Sync, randomBytes } from 'crypto'

export namespace PasswordHash {

    // create hash from password
    export function createSaltedHash(password: string): SaltedHash {
        // Creating a unique salt for a particular user
        const salt = randomBytes(16).toString('hex')
        // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
        const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
        return <SaltedHash>{salt: salt, hash: hash}
    }

    // compare password with hash
    export function isValidPassword(password: string, salt: string, hash: string): boolean {
        // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
        const passwordHash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
        return passwordHash === hash
    }

}
