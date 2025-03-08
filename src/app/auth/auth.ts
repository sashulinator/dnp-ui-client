import { ClientTokenKeeper, KeycloakAuthenticator } from '~/slices/auth'

import { request as getTokens } from './api.get-token'
import { request as refreshTokens } from './api.refresh-tokens'
import { LOCAL_STORAGE_NAME } from './constant.local-storage-name'
import { roles } from './constants.roles'

/**
 * instance
 */

export const auth = new KeycloakAuthenticator({
  accessTokenManager: new ClientTokenKeeper(LOCAL_STORAGE_NAME.accessToken, LOCAL_STORAGE_NAME.accessTokenExpiresAt),
  refreshTokenManager: new ClientTokenKeeper(LOCAL_STORAGE_NAME.refreshToken, LOCAL_STORAGE_NAME.refreshTokenExpiresAt),
  roles: roles,
  getTokens: async (params) => {
    const ret = await getTokens(params)
    return {
      accessToken: ret.data.access_token,
      refreshToken: ret.data.refresh_token,
      accessTokenExpiresAt: _getDateIn(ret.data.expires_in).getTime(),
      refreshTokenExpiresAt: _getDateIn(ret.data.refresh_expires_in).getTime(),
    }
  },
  refreshTokens: async (refreshToken) => {
    const ret = await refreshTokens({ refreshToken })
    return {
      accessToken: ret.data.access_token,
      refreshToken: ret.data.refresh_token,
      accessTokenExpiresAt: _getDateIn(ret.data.expires_in).getTime(),
      refreshTokenExpiresAt: _getDateIn(ret.data.refresh_expires_in).getTime(),
    }
  },
})

/**
 * private
 */

export function _getDateIn(inSeconds: number): Date {
  const now = new Date()
  now.setSeconds(now.getSeconds() + inSeconds)
  return now
}
