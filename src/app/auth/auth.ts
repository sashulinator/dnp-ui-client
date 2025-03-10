import { ClientTokenKeeper, KeycloakAuthenticator } from '~/slices/auth'

import { LOCAL_STORAGE_NAME } from './constant.local-storage-name'
import { roles } from './constants.roles'

/**
 * instance
 */

export const auth = new KeycloakAuthenticator({
  accessTokenManager: new ClientTokenKeeper(LOCAL_STORAGE_NAME.accessToken, LOCAL_STORAGE_NAME.accessTokenExpiresAt),
  refreshTokenManager: new ClientTokenKeeper(LOCAL_STORAGE_NAME.refreshToken, LOCAL_STORAGE_NAME.refreshTokenExpiresAt),
  roles: roles,
})
