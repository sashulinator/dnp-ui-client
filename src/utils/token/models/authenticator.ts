import { Emitter } from '../../emitter'
import type { TokenManager } from '../types'

export type Events = {
  logout: undefined
  login: undefined
  accessTokenChanged: undefined
  refreshTokenChanged: undefined
}

export type GetTokenResult = {
  accessToken: string
  refreshToken: string
  /** Unixtime */
  accessTokenExpiresAt: number
  /** Unixtime */
  refreshTokenExpiresAt: number
}

export type Props<TGetTokenParams, TRole extends string, TAccessDecoded, TRefreshDecoded> = {
  getTokens: (params: TGetTokenParams) => Promise<GetTokenResult>
  refreshTokens: (refreshToken: string) => Promise<GetTokenResult>
  roles: Record<TRole, string>
  accessTokenManager: TokenManager<TAccessDecoded>
  refreshTokenManager: TokenManager<TRefreshDecoded>
}

export abstract class Authenticator<
  TGetTokenParams,
  TRole extends string,
  TAccessDecoded,
  TRefreshDecoded,
> extends Emitter<Events> {
  roles: Record<TRole, string>

  protected _getTokens: (params: TGetTokenParams) => Promise<GetTokenResult>

  protected _refreshTokens: (refreshToken: string) => Promise<GetTokenResult>

  accessTokenManager: TokenManager<TAccessDecoded>

  refreshTokenManager: TokenManager<TRefreshDecoded>

  constructor(props: Props<TGetTokenParams, TRole, TAccessDecoded, TRefreshDecoded>) {
    super()

    this.roles = props.roles

    this._refreshTokens = props.refreshTokens

    this._getTokens = props.getTokens

    this.accessTokenManager = props.accessTokenManager
    this.refreshTokenManager = props.refreshTokenManager

    this.accessTokenManager.on('tokenChanged', () => this.emit('accessTokenChanged'))
    this.refreshTokenManager.on('tokenChanged', () => this.emit('refreshTokenChanged'))
  }

  async refreshTokens() {
    const refreshToken = this.refreshTokenManager.get()

    if (refreshToken === null) throw new Error('Refresh token does not exist.')
    if (this.isRefreshTokenExpired()) throw new Error('Refresh token expired.')

    const ret = await this._refreshTokens(refreshToken)

    this.refreshTokenManager.set(ret.refreshToken, ret.refreshTokenExpiresAt)
    this.accessTokenManager.set(ret.accessToken, ret.accessTokenExpiresAt)
  }

  async login(params: TGetTokenParams): Promise<boolean> {
    const ret = await this._getTokens(params)
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

/**
 * private
 */

export function _getDateIn(inSeconds: number): Date {
  const now = new Date()
  now.setSeconds(now.getSeconds() + inSeconds)
  return now
}
