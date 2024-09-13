import { ACCESS_TOKEN, REFRESH_TOKEN } from './local-storage-keys'

export function removeAllTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}
