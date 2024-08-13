import { UserRole } from '../types/roles'
import { getUserRole } from './get-user-role'

export const useRole = () => {
  const role = getUserRole()

  const isAdmin = role === UserRole.Admin

  const isApprover = role === UserRole.Approver

  const isOperator = role === UserRole.Operator

  return {
    isAdmin,
    isApprover,
    isOperator,
  }
}
