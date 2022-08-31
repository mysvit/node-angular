import { MathHelper } from '../helpers'

export namespace VerificationCode {

    export function generate() {
        return MathHelper.getRandomInt(10000, 99999).toString(10)
    }

}
