export interface MenuModel {
    id: number
    type: MenuItemType
    icon?: string
    text?: any
    click?: any
}

export enum MenuItemType {
    Title,
    ThematicBreak,
    Button
}
