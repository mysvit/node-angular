import { DateDb, UserSignupModel, UserTbl } from '@dto'
import { randomUUID } from 'crypto'
import { PasswordHash, VerificationCode } from '../crypt'

//TODO move to dto
export class UserDto {

    public userTblFromModel(model: UserSignupModel, picture_id?: string): UserTbl {
        const saltedHash = PasswordHash.createSaltedHash(model.password)
        return <UserTbl>{
            user_id: randomUUID(),
            email: model.email,
            nickname: model.nickname,
            signup_date: new DateDb().value,
            password_hash: saltedHash.passwordHash,
            password_salt: saltedHash.passwordSalt,
            verification_code: VerificationCode.generate(),
            avatar_id: picture_id
        }
    }

}
