import { UserLogDb } from '@db'
import { UserLogTbl } from '@dto'
import { Core } from '../core'

export class UserLogCore extends Core {

    private userLogDb = new UserLogDb(this.pool)

    /**
     * add log
     * @param userLog
     */
    async addLog(userLog: UserLogTbl) {
        return this.userLogDb.insert(userLog)
    }

}
