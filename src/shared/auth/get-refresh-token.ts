import { REFRESH_TOKEN } from './local-storage-keys'

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN)
}
