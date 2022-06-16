export interface ISimple {
  id: string
  name: string
}

export class Simple implements ISimple {
  constructor(obj) {
    this.id = obj?.id
    this.name = obj?.name
    this.desc = obj?.desc
  }

  id: string
  name: string
  desc: string
}
