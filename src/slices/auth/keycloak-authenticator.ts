import { Authenticator } from '~/utils/token'

import type { KeycloakTokenParsed } from './types'

export type LoginParams = {
  email: string
  password: string
}

export class KeycloakAuthenticator<TRole extends string> extends Authenticator<
  TRole,
  KeycloakTokenParsed,
  KeycloakTokenParsed
> {
  hasRole(role: string, resource: string) {
    const decoded = this.accessTokenManager.decode()

    if (!decoded?.resource_access) {
      return false
    }

    const access = decoded?.resource_access[resource]
    return !!access && access.roles.includes(role)
  }
}
