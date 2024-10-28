import { Emitter } from '~dnp/utils/emitter'

import { decode } from './decode'

type Events = {
  tokenChanged: void
  tokenCleared: void
}

export type Props = {
  refresh: (refreshToken: string) => Promise<{
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
  }>
}

export const ACCESS_TOKEN = 'tokenizer_accessToken'
export const REFRESH_TOKEN = 'tokenizer_refreshToken'
export const ACCESS_TOKEN_EXPIRES_AT = 'tokenizer_accessTokenExpiresAt'
export const REFRESH_TOKEN_EXPIRES_AT = 'tokenizer_refreshTokenExpiresAt'

export class Tokenizer<T> extends Emitter<Events> {
  accessToken: string | null
  refreshToken: string | null
  accessTokenExpiresAt: number | null
  refreshTokenExpiresAt: number | null
  decoded: T | null

  private _refresh: Props['refresh']

  constructor(props: Props) {
    super()

    this._refresh = props.refresh

    this.accessToken = localStorage.getItem(ACCESS_TOKEN)
    this.refreshToken = localStorage.getItem(REFRESH_TOKEN)
    this.accessTokenExpiresAt = Number(localStorage.getItem(ACCESS_TOKEN_EXPIRES_AT)) || null
    this.refreshTokenExpiresAt = Number(localStorage.getItem(REFRESH_TOKEN_EXPIRES_AT)) || null
    this.decoded = this.accessToken === null ? null : decode(this.accessToken)
  }

  async refresh() {
    if (this.refreshToken === null) throw new Error('Refresh token does not exist.')
    if (this.isRefreshTokenExpired()) throw new Error('Refresh token expired.')
    const ret = await this._refresh(this.refreshToken)
    this.setTokens(ret.accessToken, ret.refreshToken, ret.accessTokenExpiresAt, ret.refreshTokenExpiresAt)
  }

  setTokens(accessToken: string, refreshToken: string, accessTokenExpiresAt: number, refreshTokenExpiresAt: number) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.accessTokenExpiresAt = accessTokenExpiresAt
    this.refreshTokenExpiresAt = refreshTokenExpiresAt
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_AT, accessTokenExpiresAt.toString())
    localStorage.setItem(REFRESH_TOKEN_EXPIRES_AT, refreshTokenExpiresAt.toString())
    this.emit('tokenChanged')
  }

  isAccessTokenExpired() {
    return this.isExpired(this.accessTokenExpiresAt)
  }

  isRefreshTokenExpired() {
    return this.isExpired(this.refreshTokenExpiresAt)
  }

  clear() {
    this.accessToken = null
    this.refreshToken = null
    this.accessTokenExpiresAt = null
    this.refreshTokenExpiresAt = null
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT)
    localStorage.removeItem(REFRESH_TOKEN_EXPIRES_AT)
    this.emit('tokenCleared')
  }

  private isExpired(dateMs: number | null) {
    if (dateMs === null) return true
    const now = new Date().getTime()
    return dateMs < now
  }
}
