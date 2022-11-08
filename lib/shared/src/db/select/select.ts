import { SelectLimit } from './select-limit'
import { SelectOrder } from './select-order'
import { SelectWhere } from './select-where'

export interface Select {
    selectFields: string[]
    selectWhere: SelectWhere[]
    selectOrder: SelectOrder[]
    selectLimit: SelectLimit
}
