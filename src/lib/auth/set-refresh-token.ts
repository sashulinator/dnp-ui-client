import { REFRESH_TOKEN } from './local-storage-keys'

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN, token)
}
