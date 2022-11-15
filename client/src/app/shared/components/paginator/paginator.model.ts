export interface PaginatorEvent {
    startPagesRange: number
    pageNum: number
    itemsStart: number
    itemsEnd: number
}

export interface PaginatorOption {
    pageSize: number
    pagesMaxLength: number
}
