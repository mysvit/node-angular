import { SelectWhereValueBase } from '../select-where-value-base'

export interface StringArrayValue extends SelectWhereValueBase {
    value: Array<string>
}
