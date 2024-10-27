import { createStore } from '~dnp/shared/store'
import { type NonNullable } from '~dnp/utils/types/object'

import { parseJwt } from '../lib/parse-jwt'

export const ACCESS_TOKEN = 'a'
export const REFRESH_TOKEN = 'r'
export const ACCESS_TOKEN_EXPIRES_AT = 'ae'
export const REFRESH_TOKEN_EXPIRES_AT = 're'

export type State = {
  accessToken: string | null
  refreshToken: string | null
  accessTokenExpiresAt: string | null
  refreshTokenExpiresAt: string | null
}

export type Dispatchers = {
  set(state: NonNullable<State>): void
  clear: () => void
  getJwtPayload: () => null | {
    exp: number
    preferred_username: string
    resource_access: { account: { roles: string[] } }
  }
}

export const globalStore = createStore<State & Dispatchers>((set, get) => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN),
  refreshToken: localStorage.getItem(REFRESH_TOKEN),
  accessTokenExpiresAt: localStorage.getItem(ACCESS_TOKEN_EXPIRES_AT),
  refreshTokenExpiresAt: localStorage.getItem(REFRESH_TOKEN_EXPIRES_AT),
  set: (state) => {
    set(state)
    localStorage.setItem(ACCESS_TOKEN, state.accessToken)
    localStorage.setItem(REFRESH_TOKEN, state.refreshToken)
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_AT, state.accessTokenExpiresAt)
    localStorage.setItem(REFRESH_TOKEN_EXPIRES_AT, state.refreshTokenExpiresAt)
  },
  clear: () => {
    set({ accessToken: null, refreshToken: null, accessTokenExpiresAt: null, refreshTokenExpiresAt: null })
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT)
    localStorage.removeItem(REFRESH_TOKEN_EXPIRES_AT)
  },
  getJwtPayload: () => {
    const accessToken = get().accessToken
    if (!accessToken) return null
    const parsedJwt = parseJwt(accessToken)
    if (!parsedJwt) return null
    return JSON.parse(parsedJwt)
  },
}))
