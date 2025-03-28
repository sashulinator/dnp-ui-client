import { Emitter } from '~/utils/emitter'
import { type TokenKeeper, type TokenKeeperEvents, decode } from '~/utils/token'

import type { KeycloakTokenParsed } from './types'

export class ClientTokenKeeper extends Emitter<TokenKeeperEvents> implements TokenKeeper<KeycloakTokenParsed> {
  private localStorageNames: { tokenName: string; tokenExpiresAtName: string }

  constructor(tokenName: string, tokenExpiresAtName: string) {
    super()
    this.localStorageNames = {
      tokenName,
      tokenExpiresAtName,
    }
  }

  get() {
    return localStorage.getItem(this.localStorageNames.tokenName)
  }

  set(token: string, expiresAt: number) {
    localStorage.setItem(this.localStorageNames.tokenName, token)
    localStorage.setItem(this.localStorageNames.tokenExpiresAtName, expiresAt.toString())
  }

  clear() {
    localStorage.removeItem(this.localStorageNames.tokenName)
    localStorage.removeItem(this.localStorageNames.tokenExpiresAtName)
  }

  isExpired(): boolean {
    const dateMs = Number(localStorage.getItem(this.localStorageNames.tokenExpiresAtName))
    if (dateMs === null) return true
    const now = new Date().getTime()
    return dateMs < now
  }

  decode(): KeycloakTokenParsed | null {
    const token = this.get()
    try {
      return token ? decode(token) : null
    } catch (e) {
      return null
    }
  }
}
