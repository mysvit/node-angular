import { User } from '@core/user/user.js'
import { environment } from '../../environments/environment.js'

export const coreUser = new User(environment)

