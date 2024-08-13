import { UserRole } from '../types/roles'

export const USER_ROLE_STORAGE_KEY = 'user_role'

export const getUserRole = () => {
  const role = localStorage.getItem(USER_ROLE_STORAGE_KEY) as UserRole | null
  return role
}
