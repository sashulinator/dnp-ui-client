import type { Emitter } from '../emitter'

export type TokenManagerEvents = {
  tokenChanged: void
  tokenCleared: void
}

export type TokenManager<TDecoded> = Emitter<TokenManagerEvents> & {
  get: () => string | null
  set: (token: string, expirationAtUnix: number) => void
  clear: () => void
  isExpired: () => boolean
  decode: () => TDecoded | null
}
