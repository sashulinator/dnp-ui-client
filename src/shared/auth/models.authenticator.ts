import { Authenticator } from '~/utils/token'

import { request as getTokens } from './api.get-token'
import { request as refreshTokens } from './api.refresh-tokens'
import { roles } from './constants.roles'

export type LoginParams = {
  email: string
  password: string
}

export interface KeycloakTokenParsed {
  iss?: string
  sub?: string
  aud?: string
  exp?: number
  iat?: number
  auth_time?: number
  nonce?: string
  acr?: string
  amr?: string
  azp?: string
  preferred_username?: string
  session_state?: string
  realm_access?: KeycloakRoles
  resource_access?: KeycloakResourceAccess
}

export interface KeycloakRoles {
  roles: string[]
}

export interface KeycloakResourceAccess {
  [key: string]: KeycloakRoles
}

export class KeycloakAuthenticator<TRole extends string> extends Authenticator<
  LoginParams,
  TRole,
  KeycloakTokenParsed
> {
  hasRole(role: string, resource: string) {
    const decoded = this.tokenizer.decoded

    if (!decoded?.resource_access) {
      return false
    }

    const access = decoded?.resource_access[resource]
    return !!access && access.roles.includes(role)
  }
}

/**
 * instance
 */

export const auth = new KeycloakAuthenticator({
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
