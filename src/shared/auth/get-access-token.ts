import { ACCESS_TOKEN } from './local-storage-keys'

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN)
}
