import { Emitter } from '../../emitter'
import { Tokenizer } from './tokenizer'

export type Events = {
  logout: undefined
  login: undefined
  tokenChanged: undefined
}

export type GetTokenResult = {
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: number
  refreshTokenExpiresAt: number
}

export type Props<TGetTokenParams, TRole extends string> = {
  getTokens: (params: TGetTokenParams) => Promise<GetTokenResult>
  refreshTokens: (refreshToken: string) => Promise<GetTokenResult>
  roles: Record<TRole, string>
}

export abstract class Authenticator<TGetTokenParams, TRole extends string, TParsed> extends Emitter<Events> {
  roles: Record<TRole, string>

  private _getTokens: (params: TGetTokenParams) => Promise<GetTokenResult>

  private _refreshTokens: (refreshToken: string) => Promise<GetTokenResult>

  tokenizer: Tokenizer<TParsed>

  constructor(props: Props<TGetTokenParams, TRole>) {
    super()

    this.roles = props.roles

    this._refreshTokens = props.refreshTokens

    this._getTokens = props.getTokens

    this.tokenizer = new Tokenizer({})

    this.tokenizer.on('tokenChanged', () => this.emit('tokenChanged'))
  }

  async refreshTokens() {
    if (this.tokenizer.refreshToken === null) throw new Error('Refresh token does not exist.')
    if (this.isRefreshTokenExpired()) throw new Error('Refresh token expired.')

    const ret = await this._refreshTokens(this.tokenizer.refreshToken)

    this.tokenizer.setTokens(ret.accessToken, ret.refreshToken, ret.accessTokenExpiresAt, ret.refreshTokenExpiresAt)
  }

  async login(params: TGetTokenParams): Promise<boolean> {
    const ret = await this._getTokens(params)
    this.tokenizer.setTokens(ret.accessToken, ret.refreshToken, ret.accessTokenExpiresAt, ret.refreshTokenExpiresAt)
    this.emit('login')
    return true
  }

  logout() {
    this.tokenizer.clear()
    this.emit('logout')
  }

  isAccessTokenExpired() {
    return this.tokenizer.isAccessTokenExpired()
  }

  isRefreshTokenExpired() {
    return this.tokenizer.isRefreshTokenExpired()
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
