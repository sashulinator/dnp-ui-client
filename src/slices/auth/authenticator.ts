import { Emitter } from '~dnp/utils/emitter'
import { Tokenizer } from '~dnp/utils/token'

import { request as getToken } from './api/get-token'
import { request as refreshAccessToken } from './api/refresh-access-token'
import { getDateIn } from './lib/get-date-in'

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

type Events = {
  logout: undefined
  login: undefined
  permissionUpdated: undefined
}

export type LoginParams = {
  email: string
  password: string
}

export class Authenticator extends Emitter<Events> {
  private tokenizer: Tokenizer<KeycloakTokenParsed>

  keycloakClientId: string

  constructor() {
    super()

    this.keycloakClientId = 'dnp'

    this.tokenizer = new Tokenizer({
      refresh: async (refreshToken: string) => {
        const ret = await refreshAccessToken({ refreshToken })
        return {
          accessToken: ret.data.access_token,
          refreshToken: ret.data.refresh_token,
          accessTokenExpiresAt: getDateIn(ret.data.expires_in).getTime(),
          refreshTokenExpiresAt: getDateIn(ret.data.refresh_expires_in).getTime(),
        }
      },
    })

    this.tokenizer.on('tokenChanged', () => this.emit('permissionUpdated'))
  }

  refreshTokens() {
    return this.tokenizer.refresh()
  }

  logout() {
    this.tokenizer.clear()
    this.emit('logout')
  }

  async login(params: LoginParams): Promise<boolean> {
    const ret = await getToken({ email: params.email, password: params.password, clientId: this.keycloakClientId })
    this.tokenizer.setTokens(
      ret.data.access_token,
      ret.data.refresh_token,
      getDateIn(ret.data.expires_in).getTime(),
      getDateIn(ret.data.refresh_expires_in).getTime(),
    )
    this.emit('login')
    return true
  }

  isAccessTokenExpired() {
    return this.tokenizer.isAccessTokenExpired()
  }

  isRefreshTokenExpired() {
    return this.tokenizer.isRefreshTokenExpired()
  }

  hasRole(role: string, resource: string) {
    const decoded = this.tokenizer.decoded

    console.log('decoded', decoded)

    if (!decoded?.resource_access) {
      return false
    }

    const access = decoded?.resource_access[resource || this.keycloakClientId]
    return !!access && access.roles.includes(role)
  }
}
