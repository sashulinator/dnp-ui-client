import { ACCESS_TOKEN } from './local-storage-keys'

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN, token)
}
