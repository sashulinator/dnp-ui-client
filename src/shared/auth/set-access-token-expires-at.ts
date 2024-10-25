import { ACCESS_TOKEN_EXPIRES_AT } from './local-storage-keys'

export function setAccessTokenExpiresAt(expiresInSeconds: number): void {
  const now = new Date()
  now.setSeconds(now.getSeconds() + expiresInSeconds)
  localStorage.setItem(ACCESS_TOKEN_EXPIRES_AT, now.toString())
}
