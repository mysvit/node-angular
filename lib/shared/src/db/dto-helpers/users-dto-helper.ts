import { DateType, UserSignupModel, UsersTbl } from '@dto'
import { randomUUID } from 'crypto'
import { PasswordHash, VerificationCode } from '../../crypt'

export namespace UsersDtoHelper {

    export function UsersTblFromModel(model: UserSignupModel, picture_id?: string): UsersTbl {
        const saltedHash = PasswordHash.createSaltedHash(model.password)
        return <UsersTbl>{
            user_id: randomUUID(),
            email: model.email,
            nickname: model.nickname,
            signup_date: new DateType().value,
            password_hash: saltedHash.passwordHash,
            password_salt: saltedHash.passwordSalt,
            verification_code: VerificationCode.generate(),
            avatar_id: picture_id
        }
    }

}
