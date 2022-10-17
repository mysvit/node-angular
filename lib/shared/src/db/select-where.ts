export enum WhereOperand {
    And = 'and',
    Or = 'or',
    Eq = '=',
    Less = '<',
    LessEq = '<=',
    Greater = '>',
    GreaterEq = '>=',
    Like = 'like',
}

export interface WhereCondition {
    field: string
    condition: WhereOperand
    value: any
}

export interface SelectWhere {
    operand: WhereOperand
    condition: WhereCondition
    subGroup: SelectWhere[]
}
