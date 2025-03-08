/**
 * lib
 */

export { decode } from './lib/decode'

/**
 * models
 */

export {
  Authenticator,
  type GetTokenResult,
  type Events as AuthenticatorEvents,
  type Props as AuthenticatorProps,
} from './models/authenticator'

/**
 * types
 */

export type { TokenManager as TokenKeeper, TokenManagerEvents as TokenKeeperEvents } from './types'
