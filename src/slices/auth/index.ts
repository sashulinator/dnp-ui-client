/**
 * api
 */
import { Authenticator } from './authenticator'

export const auth = new Authenticator()

export { type LoginParams } from './authenticator'

/**
 * ui
 */

export { default as LoginForm } from './ui/login-form'

/**
 * models
 */

export { type Login } from './models/login'
export { roles, type Roles } from './models/roles'
export {
  globalStore,
  type State as GlobalStoreState,
  type Dispatchers as GlobalStoreDispatchers,
} from './models/global-store'

/**
 * lib
 */

export { isRealmRoles, isResourceRoles } from './lib/is-access-allowed'
