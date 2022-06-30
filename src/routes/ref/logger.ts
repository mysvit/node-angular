import { environment } from '@env'
import { Logger } from '@shared'

export const logger = new Logger(environment)