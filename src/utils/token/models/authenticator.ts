import { Emitter } from '../../emitter'
import type { TokenManager } from '../types'

export type Events = {
  logout: undefined
  login: undefined
  refreshTokens: undefined
}

export type GetTokenResult = {
  accessToken: string
  refreshToken: string
  /** Unixtime */
  accessTokenExpiresAt: number
  /** Unixtime */
  refreshTokenExpiresAt: number
}

export type Props<TRole extends string, TAccessDecoded, TRefreshDecoded> = {
  roles: Record<TRole, string>
  accessTokenManager: TokenManager<TAccessDecoded>
  refreshTokenManager: TokenManager<TRefreshDecoded>
}

export abstract class Authenticator<TRole extends string, TAccessDecoded, TRefreshDecoded> extends Emitter<Events> {
  roles: Record<TRole, string>

  accessTokenManager: TokenManager<TAccessDecoded>

  refreshTokenManager: TokenManager<TRefreshDecoded>

  constructor(props: Props<TRole, TAccessDecoded, TRefreshDecoded>) {
    super()

    this.roles = props.roles

    this.accessTokenManager = props.accessTokenManager
    this.refreshTokenManager = props.refreshTokenManager
  }

  async refreshTokens(ret: GetTokenResult) {
    this.refreshTokenManager.set(ret.refreshToken, ret.refreshTokenExpiresAt)
    this.accessTokenManager.set(ret.accessToken, ret.accessTokenExpiresAt)
    this.emit('refreshTokens')
  }

  async login(ret: GetTokenResult): Promise<boolean> {
    this.refreshTokenManager.set(ret.refreshToken, ret.refreshTokenExpiresAt)
    this.accessTokenManager.set(ret.accessToken, ret.accessTokenExpiresAt)
    this.emit('login')
    return true
  }

  logout() {
    this.refreshTokenManager.clear()
    this.accessTokenManager.clear()
    this.emit('logout')
  }

  isAccessTokenExpired() {
    return this.accessTokenManager.isExpired()
  }

  isRefreshTokenExpired() {
    return this.refreshTokenManager.isExpired()
  }

  abstract hasRole(...args: unknown[]): boolean
}
