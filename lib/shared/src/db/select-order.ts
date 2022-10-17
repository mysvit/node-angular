export enum OrderDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface SelectOrder {
    field: string
    order: OrderDirection
}
