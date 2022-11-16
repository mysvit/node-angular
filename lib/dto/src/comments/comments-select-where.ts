import { SelectLimit } from '../db-models'

export interface CommentsSelectWhere {
    parent_id: string
    search: string
    limit: SelectLimit
}
