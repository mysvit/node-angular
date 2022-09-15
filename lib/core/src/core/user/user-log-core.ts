import { UserLogTbl } from '@dto'
import { Core } from '../core'

export class UserLogCore extends Core {

    /**
     * add log
     * @param userLog
     */
    async addLog(userLog: UserLogTbl) {
        return this.userLogDb.insert(userLog)
    }

}
