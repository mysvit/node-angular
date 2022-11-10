import { IncomingHttpHeaders } from 'http'
import { ApiParams } from '../constants'

export namespace ParamsHelper {

    export function getUserId(value: IncomingHttpHeaders): string {
        return value && value[ApiParams.user_id] && value[ApiParams.user_id].toString()
    }

}
