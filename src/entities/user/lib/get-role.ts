import { Role, roles } from '../types/roles'

export const ROLE_STORAGE_KEY = 'user_role'

export function getRole(): Role | null {
  const value = localStorage.getItem(ROLE_STORAGE_KEY)

  if (value === null) return null

  if (!Object.values(roles).includes(value)) return null

  return value as Role
}
