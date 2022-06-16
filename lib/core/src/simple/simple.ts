import { simpleTbl } from '@db/db.js'
import { ISimple } from '@dto/dto.js'

export async function simpleList(): Promise<ISimple> {
  return await simpleTbl()
}
