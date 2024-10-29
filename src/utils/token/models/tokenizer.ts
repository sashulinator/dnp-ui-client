import { Emitter } from '../../emitter'
import { decode } from '../lib/decode'

export type Events = {
  tokenChanged: void
  tokenCleared: void
}

export type LocalStorageKeys = {
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: string
  refreshTokenExpiresAt: string
}

export type Props = {
  localStorageKeys?: LocalStorageKeys | undefined
}

export class Tokenizer<T> extends Emitter<Events> {
  accessToken: string | null
  refreshToken: string | null
  accessTokenExpiresAt: number | null
  refreshTokenExpiresAt: number | null
  decoded: T | null

  localStorageKeys: LocalStorageKeys

  constructor(props: Props) {
    super()

    this.localStorageKeys = props.localStorageKeys || {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      accessTokenExpiresAt: 'accessToken_expiresAt',
      refreshTokenExpiresAt: 'refreshToken_expiresAt',
    }

    this.accessToken = localStorage.getItem(this.localStorageKeys.accessToken)
    this.refreshToken = localStorage.getItem(this.localStorageKeys.refreshToken)
    this.accessTokenExpiresAt = Number(localStorage.getItem(this.localStorageKeys.accessTokenExpiresAt)) || null
    this.refreshTokenExpiresAt = Number(localStorage.getItem(this.localStorageKeys.refreshTokenExpiresAt)) || null
    this.decoded = this.accessToken === null ? null : decode(this.accessToken)
  }

  setTokens(accessToken: string, refreshToken: string, accessTokenExpiresAt: number, refreshTokenExpiresAt: number) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.accessTokenExpiresAt = accessTokenExpiresAt
    this.refreshTokenExpiresAt = refreshTokenExpiresAt
    localStorage.setItem(this.localStorageKeys.accessToken, accessToken)
    localStorage.setItem(this.localStorageKeys.refreshToken, refreshToken)
    localStorage.setItem(this.localStorageKeys.accessTokenExpiresAt, accessTokenExpiresAt.toString())
    localStorage.setItem(this.localStorageKeys.refreshTokenExpiresAt, refreshTokenExpiresAt.toString())
    this.decoded = decode(this.accessToken)
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
    localStorage.removeItem(this.localStorageKeys.accessToken)
    localStorage.removeItem(this.localStorageKeys.refreshToken)
    localStorage.removeItem(this.localStorageKeys.accessTokenExpiresAt)
    localStorage.removeItem(this.localStorageKeys.refreshTokenExpiresAt)
    this.decoded = null
    this.emit('tokenCleared')
  }

  private isExpired(dateMs: number | null) {
    if (dateMs === null) return true
    const now = new Date().getTime()
    return dateMs < now
  }
}
