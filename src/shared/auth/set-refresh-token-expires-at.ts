import { REFRESH_TOKEN_EXPIRES_AT } from './local-storage-keys'

export function setRefreshTokenExpiresAt(expiresInSeconds: number): void {
  const now = new Date()
  now.setSeconds(now.getSeconds() + expiresInSeconds)
  localStorage.setItem(REFRESH_TOKEN_EXPIRES_AT, now.toString())
}
