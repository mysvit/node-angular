import { UsersLogsDb } from '@db'
import { UsersLogsTbl } from '@dto'
import { Core } from '../core'

export class UsersLogsCore extends Core {

    private userLogDb = new UsersLogsDb(this.pool)

    /**
     * add log
     * @param tbl
     */
    async addLog(tbl: UsersLogsTbl) {
        return this.userLogDb.insert(tbl)
    }

}
