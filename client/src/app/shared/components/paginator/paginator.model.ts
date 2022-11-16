import { SelectLimit } from '@dto'

export interface PaginatorEvent {
    startPagesRange: number
    pageNum: number
    limit: SelectLimit
}

export interface PaginatorOption {
    pageSize: number
    pagesMaxLength: number
}
