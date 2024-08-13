import { UserRole } from '../types/roles'
import { USER_ROLE_STORAGE_KEY } from './get-user-role'

export const setUserRole = (role: UserRole) => {
  localStorage.setItem(USER_ROLE_STORAGE_KEY, role)
}
