import { Role } from '../types/roles'
import { ROLE_STORAGE_KEY } from './get-role'

export const setRole = (role: Role) => {
  localStorage.setItem(ROLE_STORAGE_KEY, role)
}
