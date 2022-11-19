import { SelectLimit } from '@dto'

export interface PaginatorEvent {
    startPagesRange: number
    pageNum: number
    limit: SelectLimit
}

export interface PaginatorOptions {
    pageSize: number
    pagesMaxLength: number
}
