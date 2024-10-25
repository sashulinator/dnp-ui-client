import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_AT, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES_AT } from './local-storage-keys'

export function removeAllTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN_EXPIRES_AT)
  localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT)
}
